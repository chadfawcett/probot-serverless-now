const nock = require('nock')
const request = require('supertest')
const { serverless } = require('./')

nock.disableNetConnect()
nock.enableNetConnect('127.0.0.1')

const createApp = name => {
  const route = `/${name}`
  return [
    route,
    app =>
      app.route(route).get('/', (_, res) => res.send(`Hello from ${route}`))
  ]
}

test('exports regular NodeJS listener usable by servers', () => {
  const [route, app] = createApp('app1')
  return request(serverless(app, { githubToken: 'faketoken' }))
    .get(route)
    .expect(200)
})
