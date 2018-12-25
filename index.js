const { createProbot } = require('probot')
const { findPrivateKey } = require('probot/lib/private-key')

require('dotenv').config()

const defaultOptions = {
  id: process.env.APP_ID,
  secret: process.env.WEBHOOK_SECRET,
  cert: findPrivateKey()
}

module.exports = (app, options = defaultOptions) => {
  const probot = createProbot(options)
  probot.load(app)
  return probot.server
}
