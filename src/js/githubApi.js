const github = require('octonode')

require('dotenv').config()

const client = github.client(process.env.ACCESS_TOKEN)
const ghrepo = client.repo('1dv023/ab224qr-examination-3')

let issues = []

ghrepo.issues((callback, body, header) => {
  body.map(issue => issues.push({
    id: issue.number,
    issue: issue.title,
    description: issue.body,
    comments: issue.comments,
    state: issue.state,
    created: issue.created_at
  }))
  console.log(issues)
})

//   ghrepo.issues((callback, body, header) => {
//     body.map(issue => issues.push({
//       id: issue.number,
//       issue: issue.title,
//       description: issue.body,
//       comments: issue.comments,
//       state: issue.state,
//       created: issue.created_at
//     }))
//     res.render('home/index', { issues: issues })
//   })
