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
  try {
    let result = await ghrepo.issuesAsync()

    result = result[0].map(issue => ({
      id: issue.number,
      issue: issue.title,
      description: issue.body,
      comments: issue.comments,
      state: issue.state,
      created: issue.created_at.substr(0, 10),
      time: issue.created_at.substr(11, 5),
      url: issue.html_url
    }))

    res.render('home/index', { issues: result })
  } catch (err) {
    console.log(err)
  }
  // res.render('home/index')
}

// Exports.
module.exports = homeController
