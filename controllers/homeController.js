/**
 * homeController.
 *
 * @author Adam Bergman
 * @version 1.0
 */

const fetchGitHub = require('../src/js/fetch')
const homeController = {}

homeController.index = async (req, res, next) => {
  try {
    let result = await fetchGitHub('https://api.github.com/repos/1dv023/ab224qr-examination-3/issues')

    result = result.map(issue => ({
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
}

// Exports.
module.exports = homeController
