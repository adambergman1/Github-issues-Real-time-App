const socket = io.connect()

console.log('Hello from js folder')

socket.on('issue', issue => {
  console.log('Should add the issues from client side')
  // Format what we get from GitHub
  issue = issue.issues.map(issue => ({
    id: issue.number,
    issue: issue.title,
    description: issue.body,
    comments: issue.comments,
    state: issue.state,
    created: issue.created_at.substr(0, 10),
    time: issue.created_at.substr(11, 5),
    url: issue.html_url
  }))
  addIssue(issue)
})

function addIssue (issues) {
  // Add to the DOM
  const tbody = document.querySelector('.list-of-issues')
  issues.forEach(issue => {
    const tr = document.createElement('tr')

    const issueID = document.createElement('td')
    const issueTitle = document.createElement('td')
    const issueDescription = document.createElement('td')
    const issueComments = document.createElement('td')
    const issueState = document.createElement('td')
    const issueCreatedAt = document.createElement('td')

    issueID.textContent = issue.id
    issueTitle.textContent = issue.issue
    issueDescription.textContent = issue.description
    issueComments.textContent = issue.comments
    issueState.textContent = issue.state
    issueCreatedAt.textContent = issue.created + ' - ' + issue.time

    tr.appendChild(issueID)
    tr.appendChild(issueTitle)
    tr.appendChild(issueDescription)
    tr.appendChild(issueComments)
    tr.appendChild(issueState)
    tr.appendChild(issueCreatedAt)

    tbody.appendChild(tr)
  })
}
