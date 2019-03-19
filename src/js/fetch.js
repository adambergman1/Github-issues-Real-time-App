/**
 * Module that fetches data from GitHub
 *
 * @author Adam Bergman
 * @version 1.0
 */

require('dotenv').config()

const fetch = require('node-fetch')

async function fetchGitHub (url) {
  const response = await fetch(url, {
    headers: {
      Authorization: 'token ' + process.env.ACCESS_TOKEN
    }
  })
  return response.json()
}

module.exports = fetchGitHub
