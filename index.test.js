const nock = require('nock')
const request = require('supertest')
const serverless = require('./')

nock.disableNetConnect()
nock.enableNetConnect('127.0.0.1')

test('exports regular NodeJS listener usable by servers', () => {
  const defaultApp = require('probot/lib/apps/default')
  return request(serverless(defaultApp, { githubToken: 'faketoken' }))
    .get('/probot')
    .expect(200)
})
