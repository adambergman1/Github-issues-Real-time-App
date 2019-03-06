/**
 * Fetch module
 * @author Adam Bergman
 * @version 1.0
 */

const fetch = require('node-fetch')

/**
 * Fetches the source code of an HTML document
 *
 * @param {*} url - the url to be fetched
 * @returns a html document
 */
async function getHTML () {
  const response = await fetch('https://api.github.com')
  return response.text()
}

/**
 * Sends a HTTP post request with login credentials in order to login and view html source code
 *
 * @param {*} scrapedLinks - the link to send the request to
 * @returns a html document
 */
// async function fetchGithub (scrapedLinks) {
//   const githubUrl = 'https://api.github.com'

//   const sendHTTPPost = await fetch(githubUrl + '/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: 'username=zeke&password=coys&submit=login',
//     jar: true
//   })
//   const html = await sendHTTPPost.text()
//   return html
// }

module.exports = {
  getHTML: getHTML
//   fetchGithub: fetchGithub
}
