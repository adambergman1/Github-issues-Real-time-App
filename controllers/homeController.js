/**
 * homeController.
 *
 * @author Adam Bergman
 * @version 1.0
 */
const homeController = {}
const github = require('octonode')
require('dotenv').config()

const client = github.client(process.env.ACCESS_TOKEN)
const ghrepo = client.repo('1dv023/ab224qr-examination-3')

homeController.index = async (req, res, next) => {
  let result = await ghrepo.issuesAsync()

  result = result[0].map(issue => ({
    id: issue.number,
    issue: issue.title,
    description: issue.body,
    comments: issue.comments,
    state: issue.state,
    created: issue.created_at
  }))
  res.render('home/index', { issues: result })
}

// Exports.
module.exports = homeController
