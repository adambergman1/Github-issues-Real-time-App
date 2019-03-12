const crypto = require('crypto')

const createComparisonSignature = body => {
  const hmac = crypto.createHmac('sha1', process.env.SIGNATURE)
  const selfSignature = hmac.update(body).digest('hex')
  return `sha1=${selfSignature}` // shape in GitHub header
}

const compareSignatures = (signature, comparisonSignature) => {
  const source = Buffer.from(signature)
  const comparison = Buffer.from(comparisonSignature)
  return crypto.timingSafeEqual(source, comparison) // constant time comparison
}

const verifyGithubPayload = (req, res, next) => {
  const { headers, body } = req

  const signature = headers['x-hub-signature']
  const comparisonSignature = createComparisonSignature(body)

  if (!compareSignatures(signature, comparisonSignature)) {
    return res.status(401).send('Mismatched signatures')
  }

  next()
}

module.exports = verifyGithubPayload
