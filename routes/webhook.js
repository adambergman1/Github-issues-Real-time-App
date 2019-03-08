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
  .post('/webhook', async (req, res) => {
    const io = req.app.get('io')
    console.log(io)

    //   let body = req.body

    //   console.log('headers', req.headers)
    //   console.log('body', body)

    try {
      const fetchGithub = require('./src/js/fetch')
      let result = await fetchGithub('https://api.github.com/repos/1dv023/ab224qr-examination-3/issues')
      io.emit('issue', { issues: result })
    } catch (err) {
      console.log(err)
    }

    res.sendStatus(200)
  })

module.exports = router
