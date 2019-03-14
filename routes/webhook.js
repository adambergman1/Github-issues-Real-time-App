/**
 * webhook.
 *
 * @author Adam Bergman
 * @version 1.0
 */

const express = require('express')
const router = express.Router()
const verifyGithubPayload = require('../src/js/verifyGitHub')

router.post('/', verifyGithubPayload, (req, res) => {
  const io = req.app.get('socketio')

  const body = JSON.parse(req.body)
  console.log(body.action)

  const issue = {
    id: body.issue.id.toString(),
    number: body.issue.number,
    title: body.issue.title,
    description: body.issue.body,
    comments: body.issue.comments,
    state: body.issue.state,
    created: body.issue.created_at.substr(0, 10),
    time: body.issue.created_at.substr(11, 5),
    url: body.issue.html_url
  }

  if (body.comment) {
    issue.comment = body.comment.body
  }

  if (body.action === 'created') {
    io.emit('addComment', issue)
  }
  if (body.action === 'opened' || body.action === 'reopened') {
    io.emit('newIssue', issue)
  }
  if (body.action === 'closed') {
    io.emit('closed', issue)
  }
  if (body.action === 'edited') {
    io.emit('edited', issue)
  }
  if (body.action === 'deleted') {
    io.emit('removeComment', issue)
  }

  res.sendStatus(200)
})

module.exports = router
