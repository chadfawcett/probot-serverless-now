const { createProbot } = require('probot')
const { findPrivateKey } = require('probot/lib/private-key')

require('dotenv').config()

const defaultOptions = {
  id: process.env.APP_ID,
  secret: process.env.WEBHOOK_SECRET,
  cert: findPrivateKey()
}

module.exports.serverless = (apps, options = defaultOptions) => {
  const probot = createProbot(options)
  apps = [].concat(apps) //  Coerce to array
  apps.forEach(a => probot.load(a))
  return probot.server
}
