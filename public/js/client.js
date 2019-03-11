const socket = window.io.connect('https://d74e410a.ngrok.io')

console.log('Hello from public JS folder')

socket.on('changeComments', issue => {
  // Updating comment count for the issue
  const currentIssueComments = document.querySelector(`#issue-${issue.id} .issue-comments`)
  currentIssueComments.textContent = issue.comments + 1
})

socket.on('closed', issue => {
  // Removing the issue
  const currentIssue = document.querySelector(`#issue-${issue.id}`)
  currentIssue.parentNode.removeChild(currentIssue)
})

socket.on('newIssue', issue => {
  // Creating a new issue
  let mainDiv = document.querySelector('.list-of-issues')
  const issueClone = document.querySelector('.issue')
  let template = document.importNode(issueClone, true)

  template.querySelector('.issue-number').textContent = issue.number
  template.querySelector('.issue-title-link').textContent = issue.title
  template.querySelector('.issue-title-link').setAttribute('href', issue.url)
  template.querySelector('.issue-description').textContent = issue.description
  template.querySelector('.issue-comments').textContent = issue.comments
  template.querySelector('.issue-state').textContent = issue.state
  template.querySelector('.issue-date').textContent = `${issue.created} - ${issue.time}`

  mainDiv.insertBefore(template, issueClone)
})
