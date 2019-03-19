const socket = window.io.connect()

let counter = 0

socket.on('addComment', issue => {
  // Increasing comment count with one
  const currentIssueComments = document.querySelector(`#issue-${issue.id} .issue-comments`)
  currentIssueComments.textContent = issue.comments + 1
  currentIssueComments.classList.add('adding')
  addNotification(issue)

  setTimeout(function () { currentIssueComments.classList.remove('adding') }, 3000)
})

socket.on('removeComment', issue => {
  // Decreasing comment count with one
  const currentIssueComments = document.querySelector(`#issue-${issue.id} .issue-comments`)
  currentIssueComments.textContent = issue.comments - 1
  currentIssueComments.classList.add('removing')

  setTimeout(function () { currentIssueComments.classList.remove('removing') }, 3000)
})

socket.on('closed', issue => {
  // Closing the issue
  const currentIssue = document.querySelector(`#issue-${issue.id}`)
  const currentIssueState = currentIssue.querySelector('.issue-state')
  currentIssueState.textContent = issue.state
  currentIssue.classList.add('removing')

  addNotification(issue)

  setTimeout(function () {
    const currentIssue = document.querySelector(`#issue-${issue.id}`)
    currentIssue.parentNode.removeChild(currentIssue)
  }, 3000)
})

socket.on('edited', issue => {
  // Editing the title and/or description
  const currentIssueTitle = document.querySelector(`#issue-${issue.id} .issue-title-link`)
  const currentIssueDescription = document.querySelector(`#issue-${issue.id} .issue-description .description`)

  currentIssueTitle.textContent = issue.title
  currentIssueTitle.setAttribute('href', issue.url)
  currentIssueDescription.textContent = issue.description

  addNotification(issue)
})

socket.on('newIssue', issue => {
  // Creating a new issue
  let mainDiv = document.querySelector('.list-of-issues')
  const issueDiv = document.querySelector('.issue')
  let issueClone = document.importNode(issueDiv, true)
  issueClone.classList.add('adding')

  issueClone.querySelector('.issue-number').textContent = 'No. ' + issue.number
  issueClone.querySelector('.issue-title-link').textContent = issue.title
  issueClone.querySelector('.issue-title-link').setAttribute('href', issue.url)

  if (issue.description) {
    issueClone.querySelector('.issue-description .description').textContent = issue.description
  } else {
    issueClone.querySelector('.issue-description .description').classList.add('not-provided')
    issueClone.querySelector('.issue-description .description').textContent = 'No description provided.'
  }

  issueClone.querySelector('.issue-comments').textContent = issue.comments
  issueClone.querySelector('.issue-state').textContent = issue.state
  issueClone.querySelector('.issue-date').textContent = `${issue.created} ${issue.time}`

  mainDiv.insertBefore(issueClone, issueDiv)

  addNotification(issue)

  setTimeout(function () { issueClone.classList.remove('adding') }, 3000)
})

window.onload = function () {
  // Remove the issue element and mark it as closed
  const markClosedBtn = document.querySelectorAll('.issue-mark-closed')
  markClosedBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault()
      const issueDiv = btn.parentNode
      const issueNumber = issueDiv.querySelector('.issue-number').textContent

      const issueInfo = {
        number: Number(issueNumber.replace('No. ', '')),
        id: Number(issueDiv.id.replace('issue-', '')),
        state: 'closed'
      }
      socket.emit('close', issueInfo)
    })
  })

  // Enable dropdown functionality
  const dropdown = document.querySelector('.dropdown-trigger')
  M.Dropdown.init(dropdown)

  // Sorting functionality - grid or list view
  const issues = document.querySelectorAll('.list-of-issues .issue')
  const gridViewBtn = document.querySelector('.sorting .toggle-view.grid')
  gridViewBtn.addEventListener('click', e => {
    e.preventDefault()
    issues.forEach(issue => {
      issue.classList.remove('fullwidth')
    })
  })
  const listViewBtn = document.querySelector('.sorting .toggle-view.list')
  listViewBtn.addEventListener('click', e => {
    e.preventDefault()
    issues.forEach(issue => {
      issue.classList.add('fullwidth')
    })
  })
}

function addNotification (issue) {
  counter++
  const notificationBtn = document.querySelector('.dropdown-trigger.btn')
  notificationBtn.textContent = `Notifications (${counter})`
  notificationBtn.classList.remove('disabled')

  const notifications = document.querySelector('.notifications')
  const notification = document.querySelector('.notification')
  const template = document.importNode(notification.content, true)

  if (issue.action === 'closed') {
    template.querySelector('.comment').textContent = `The issue ${issue.title} has been marked as closed`
  }

  if (issue.action === 'created') {
    template.querySelector('.comment').textContent = `New comment: ${issue.comment} on issue ${issue.title}`
  }

  if (issue.action === 'opened') {
    template.querySelector('.comment').textContent = `A new issue has been added: ${issue.title}`
  }

  if (issue.action === 'reopened') {
    template.querySelector('.comment').textContent = `The issue ${issue.title} has been reopened`
  }

  if (issue.action === 'edited') {
    template.querySelector('.comment').textContent = `The title or description has been changed to ${issue.title}`
  }

  if (issue.action === 'deleted') {
    template.querySelector('.comment').textContent = `A comment on issue ${issue.title} has been removed`
  }

  notifications.appendChild(template)
}
