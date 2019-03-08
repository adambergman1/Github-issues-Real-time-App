const socket = io.connect()

console.log('Hello from js folder')

socket.on('issue', issues => {
  // Format what we get from GitHub
  issues = issues.issues.map(issue => ({
    id: issue.number,
    issue: issue.title,
    description: issue.body,
    comments: issue.comments,
    state: issue.state,
    created: issue.created_at.substr(0, 10),
    time: issue.created_at.substr(11, 5),
    url: issue.html_url
  }))

  const table = document.querySelector('.list-of-issues')
  // Add to the DOM
  issues.forEach(issue => {
    let idDiv = document.createElement('p')
    idDiv.textContent = issue.id
    idDiv.appendChild(table)
    console.log(issue.id)
  })
})
