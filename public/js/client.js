const socket = window.io.connect('https://d74e410a.ngrok.io')

console.log('Hello from js folder')

socket.on('changeCommentCount', issue => {
  console.log('Adding updates to a comment')
  const currentIssue = document.querySelector(`#issue-${issue.id} .issue-comments`)
  currentIssue.textContent = issue.comments + 1
  console.log(currentIssue)
})

// function addIssue (issues) {
//   // Add to the DOM
//   const tbody = document.querySelector('.list-of-issues')
//   issues.forEach(issue => {
//     const tr = document.createElement('tr')

//     const issueID = document.createElement('td')
//     const issueTitle = document.createElement('td')
//     const issueDescription = document.createElement('td')
//     const issueComments = document.createElement('td')
//     const issueState = document.createElement('td')
//     const issueCreatedAt = document.createElement('td')

//     issueID.textContent = issue.id
//     issueTitle.textContent = issue.issue
//     issueDescription.textContent = issue.description
//     issueComments.textContent = issue.comments
//     issueState.textContent = issue.state
//     issueCreatedAt.textContent = issue.created + ' - ' + issue.time

//     tr.appendChild(issueID)
//     tr.appendChild(issueTitle)
//     tr.appendChild(issueDescription)
//     tr.appendChild(issueComments)
//     tr.appendChild(issueState)
//     tr.appendChild(issueCreatedAt)

//     tbody.appendChild(tr)
//   })
// }
