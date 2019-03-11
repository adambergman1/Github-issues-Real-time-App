/**
 * homeRouter.
 *
 * @author Adam Bergman
 * @version 1.0
 */

const express = require('express')
const router = express.Router()

const fetchGithub = require('../src/js/fetch')

// Fetch all issues from Github and send them to the index hbs file
router.get('/', async (req, res, next) => {
  let result = await fetchGithub('https://api.github.com/repos/1dv023/ab224qr-examination-3/issues')

  result = result.map(issue => ({
    id: issue.id,
    number: issue.number,
    title: issue.title,
    description: issue.body,
    comments: issue.comments,
    state: issue.state,
    created: issue.created_at.substr(0, 10),
    time: issue.created_at.substr(11, 5),
    url: issue.html_url
  }))
  res.render('home/index', { issues: result })
})

// Exports.
module.exports = router
