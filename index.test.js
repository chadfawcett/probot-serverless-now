const nock = require('nock')
const request = require('supertest')
const serverless = require('./')

//  Mock default stats app as it is throwing unhandled promise rejections and
//  isn't actually needed for tests
jest.mock('probot/lib/apps/stats')

nock.disableNetConnect()
nock.enableNetConnect('127.0.0.1')

test('exports regular NodeJS listener usable by servers', () => {
  nock('https://api.github.com')
    .get('/app/installations')
    .query(true)
    .reply(200, { account: { login: 'test' } })

  return request(serverless(() => {}, { githubToken: 'faketoken' }))
    .get('/probot')
    .expect(200)
})
