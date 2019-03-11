/**
 * webhook.
 *
 * @author Adam Bergman
 * @version 1.0
 */

const express = require('express')
const router = express.Router()

router
// .get('/webhook', (req, res, next) => {
//   console.log(res)
//   res.sendStatus(200)
// })
  .post('/', async (req, res) => {
    const io = req.app.get('socketio')

    let body = JSON.parse(req.body)
    // console.log(body)

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
    if (body.action === 'created') {
      io.emit('changeCommentCount', {
        id: issue.id, action: body.action, comments: issue.comments
      })
    }
    res.sendStatus(200)
  })

module.exports = router
