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

test('accepts an array of apps', async () => {
  const [route1, app1] = createApp('app1')
  const [route2, app2] = createApp('app2')
  const bot = serverless([app1, app2], { githubToken: 'faketoken' })

  await request(bot)
    .get(route1)
    .expect(200, `Hello from ${route1}`)
  await request(bot)
    .get(route2)
    .expect(200, `Hello from ${route2}`)
})
