const socket = window.io.connect()

socket.on('addComment', issue => {
  // Increasing comment count with one
  const currentIssueComments = document.querySelector(`#issue-${issue.id} .issue-comments`)
  currentIssueComments.textContent = issue.comments + 1
  currentIssueComments.classList.add('adding')

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
  const issueClone = document.querySelector('.issue')
  let template = document.importNode(issueClone, true)
  template.classList.add('adding')

  template.querySelector('.issue-number').textContent = issue.number
  template.querySelector('.issue-title-link').textContent = issue.title
  template.querySelector('.issue-title-link').setAttribute('href', issue.url)
  template.querySelector('.issue-description').textContent = issue.description
  template.querySelector('.issue-comments').textContent = issue.comments
  template.querySelector('.issue-state').textContent = issue.state
  template.querySelector('.issue-date').textContent = `${issue.created} ${issue.time}`

  mainDiv.insertBefore(template, issueClone)

  setTimeout(function () { template.classList.remove('adding') }, 3000)
})
