[![npm Version](https://badgen.net/npm/v/probot)](https://npmjs.com/package/probot)
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
    "WEBHOOK_SECRET": "@webhook-secret-base64-encoded",
    "PRIVATE_KEY": "@private-key"
  },
  "builds": [{ "src": "now.js", "use": "@now/node" }],
  "routes": [{ "src": "/", "dest": "/now.js" }]
}
```

```bash
$ now # Deploy using now!
```

## API

### `serverless(appFn, [options])`

Create a new instance of Probot and load the supplied App.

**Options**

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

[MIT](https://github.com/chadfawcett/probot-serverless-now/blob/master/LICENSE.md) Copyright 2018 Chad Fawcett
