const socket = window.io.connect()

socket.on('addComment', issue => {
  // Increasing comment count with one
  const currentIssueComments = document.querySelector(`#issue-${issue.id} .issue-comments`)
  currentIssueComments.textContent = issue.comments + 1
  currentIssueComments.classList.add('adding')

  const notificationBtn = document.querySelector('.dropdown-trigger.btn')
  notificationBtn.textContent = `New notification!`
  notificationBtn.classList.remove('disabled')

  const notifications = document.querySelector('.notifications')
  const notification = document.querySelector('.notification')
  const template = document.importNode(notification.content, true)

  template.querySelector('.comment').textContent = issue.comment
  template.querySelector('.title').textContent = issue.title

  notifications.appendChild(template)

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
  // Removing the issue
  const currentIssue = document.querySelector(`#issue-${issue.id}`)
  const currentIssueState = currentIssue.querySelector('.issue-state')
  currentIssueState.textContent = issue.state
  currentIssue.classList.add('removing')

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
  issueClone.querySelector('.issue-description').textContent = issue.description
  issueClone.querySelector('.issue-comments').textContent = issue.comments
  issueClone.querySelector('.issue-state').textContent = issue.state
  issueClone.querySelector('.issue-date').textContent = `${issue.created} ${issue.time}`

  mainDiv.insertBefore(issueClone, issueDiv)

  setTimeout(function () { issueClone.classList.remove('adding') }, 3000)
})

window.onload = function () {
  // const stateDiv = document.querySelectorAll('.issue-state')

  // stateDiv.forEach(state => {
  //   if (state.textContent === 'closed') {
  //     state.parentNode.classList.add('removed')
  //   }
  // })

  let hideBtn = document.querySelectorAll('.issue-hide-show a')
  hideBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault()
      btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode)
    })
  })

  let dropdowns = document.querySelector('.dropdown-trigger')
  M.Dropdown.init(dropdowns)
}
