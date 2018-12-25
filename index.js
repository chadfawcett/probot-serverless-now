const { createProbot } = require('probot')
const { findPrivateKey } = require('probot/lib/private-key')

require('dotenv').config()

const defaultOptions = {
  id: process.env.APP_ID,
  secret: process.env.WEBHOOK_SECRET,
  cert: findPrivateKey()
}

module.exports = (appFn, options = defaultOptions) => {
  const probot = createProbot(options)
  probot.setup([appFn])
  return probot.server
}
