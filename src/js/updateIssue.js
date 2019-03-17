require('dotenv').config()

const fetch = require('node-fetch')

async function sendDataToGitHub (issueInfo) {
  const data = await fetch(`https://api.github.com/repos/1dv023/ab224qr-examination-3/issues/${issueInfo.number}`, {
    method: 'POST',
    headers: {
      Authorization: 'token ' + process.env.ACCESS_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(issueInfo)
  })
  return data.json()
}

module.exports = sendDataToGitHub
