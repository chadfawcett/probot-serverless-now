[![npm Version](https://img.shields.io/npm/v/@chadfawcett/probot-serverless-now.svg)](https://npmjs.com/package/@chadfawcett/probot-serverless-now)
[![Build Status](https://semaphoreci.com/api/v1/chadfawcett/probot-serverless-now/branches/master/shields_badge.svg)](https://semaphoreci.com/chadfawcett/probot-serverless-now)

# Zeit Now v2 Extension for Probot

> A [Probot](https://github.com/probot/probot) extenstion to make it easier to
> run your Probot Apps on [Zeit Now v2](https://zeit.co/now)

Zeit Now v2 changes its functionality from long-running processes to functions.
This means v2 deployments can't start `probot run`, and instead need direct
access to the App's endpoint.

## Usage

```bash
$ npm install @chadfawcett/probot-serverless-now
```

```js
//  now.js
var { serverless } = require('@chadfawcett/probot-serverless-now')
const appFn = require('./')
module.exports = serverless(appFn)
```

```js
//  index.js
module.exports = app => {
  app.on('issues.opened', async context => {
    // A new issue was opened, what should we do with it?
    context.log(context.payload)
  })
}
```

```json
// now.json
{
  "version": 2,
  "env": {
    "APP_ID": "@app-id",
    "WEBHOOK_SECRET": "@webhook-secret",
    "PRIVATE_KEY": "@private-key-base64-encoded"
  },
  "builds": [{ "src": "now.js", "use": "@now/node" }],
  "routes": [{ "src": "/", "dest": "/now.js" }]
}
```

```bash
$ now # Deploy using now!
```

## Using Routes

Zeit Now [encourages multiple granular
endpoints](https://github.com/zeit/docs/blob/b20b65e0aad632f9a27f82fab9148f51a70c3fd6/pages/docs/v2/deployments/concepts/lambdas.mdx#L111-L121)
instead of one monolithic app, so whenever possible you should separate custom
routing. That being said, there may be cases for wanting to have custom routes
inside of your app using `app.route()`. To enable this, simply change the `src`
path in your `now.json` to have a wildcard ending (`"src": "/*"`).

```json
{
  ...
  "routes": [{ "src": "/*", "dest": "/now.js" }]
}
```

## Multiple Apps

As mentioned in [using routes](#using-routes), monolithic apps are discouraged.
That being said, there may be a use case for running multiple Probot Apps
together (ie logging, stats, etc). For this reason the `serverless` function
also accepts an array of app functions.

```js
var { serverless } = require('@chadfawcett/probot-serverless-now')
const statsApp = require('probot/lib/apps/stats')
const myApp = require('./')

module.exports = serverless([statsApp, myApp])
```

## API

### `serverless(appFn[, options])`

Create a new instance of Probot and load the supplied App\[s\].

#### Parameters

<!-- prettier-ignore-start -->
Name | Type | Required | Description
--- | --- | --- | ---
appFn | function \| array | true | Single or array of of Probot App functions
options | [object](#options) | false | Probot config options
<!-- prettier-ignore-end -->

#### Options

<!-- prettier-ignore-start -->
Name | Type | Default | Description
--- | --- | --- | ---
id | number | process.env.APP_ID | The App ID assigned to your GitHub App
secret | string | process.env.WEBHOOK_SECRET | The webhook secret used when creating a GitHub App
cert | string | [findPrivateKey()](https://github.com/probot/probot/blob/bb06c51485245d75508982826180e7c2e774a7db/src/private-key.ts#L12-L22) | The contents of the GitHub App private key (multiline or base64)
<!-- prettier-ignore-end -->

**Example**

With default options

```js
var { serverless } = require('@chadfawcett/probot-serverless-now')
const appFn = require('./')
module.exports = serverless(appFn)
```

With custom options

```js
var { serverless } = require('@chadfawcett/probot-serverless-now')
const appFn = require('./')

const options = {
  id: 123,
  secret: process.env.MY_SECRET,
  cert: process.env.MY_PRIVATE_KEY
}

module.exports = serverless(appFn, options)
```

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install @chadfawcett/probot-serverless-now
```

This package is meant to be installed alongside your Probot app, so `probot` is
a peer dependency.

## Acknowledgments

[@chadfawcett/probot-serverless-now](#) was inspired by [probot/serverless-lambda](https://github.com/probot/serverless-lambda)

## See Also

- [`passionkind/probot-serverless-now`](https://github.com/passionkind/probot-serverless-now#readme)
- [`tibdex/probot-serverless-now`](https://github.com/tibdex/probot-serverless-now)
- [`noffle/common-readme`](https://github.com/noffle/common-readme)

## License

[MIT](https://github.com/chadfawcett/probot-serverless-now/blob/master/LICENSE.md) Copyright Chad Fawcett
