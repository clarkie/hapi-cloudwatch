# hapi-cloudwatch

A hapi plugin for sending request response time metrics to AWS CloudWatch.

[![Build Status](https://travis-ci.org/clarkie/hapi-cloudwatch.png?branch=master)](https://travis-ci.org/clarkie/hapi-cloudwatch)
[![Coverage Status](https://coveralls.io/repos/github/clarkie/dynogels/badge.svg)](https://coveralls.io/github/clarkie/dynogels)
[![npm version](https://badge.fury.io/js/hapi-cloudwatch.svg)](http://badge.fury.io/js/hapi-cloudwatch)
[![Dependencies Status](https://david-dm.org/clarkie/hapi-cloudwatch.svg)](https://david-dm.org/clarkie/hapi-cloudwatch)
[![DevDependencies Status](https://david-dm.org/clarkie/hapi-cloudwatch/dev-status.svg)](https://david-dm.org/clarkie/hapi-cloudwatch#info=devDependencies)
[![Known Vulnerabilities](https://snyk.io/test/npm/hapi-cloudwatch/badge.svg)](https://snyk.io/test/npm/hapi-cloudwatch)

## Installation

	npm install hapi-cloudwatch

## Usage

To install this plugin on your Hapi server, do something similar to this:

```js
var Hapi = require('hapi');
var server = new Hapi.Server();

var options = {};

server.register({ register: require('hapi-cloudwatch'), options }, function(err) {
  if (err) {
    console.log('error', 'Failed loading plugin: hapi-cloudwatch');
  }
});
```

## Plugin Options

### `region`

AWS region to send the metrics to.

Defaults to `eu-west-1`

### `environment`

The primary dimension added to the CloudWatch metric

Defaults to `process.env.NODE_ENV`

### `enabled`

Turns on/off the sending of metrics to CloudWatch

Defaults to `true`

### `metricsSentCallback`

A function to call when metrics have been sent to CloudWatch.

Defaults to no-op.

## Example

A Hapi route configured like this:

```js
server.route({
  method: 'GET',
  path: '/products/{id}',
  handler: function(request, reply) {
    reply('Success!');
  }
});
```
and run with `NODE_ENV=production npm start` will send a metric to AWS CloudWatch with the following dimensions:

- metric name: `responseTime`
- environment: `production`
- method: `GET`
- statusCode: `200`
- path: `/products/{id}`

Here's an example of what can be graphed in CloudWatch with this metric:

![Example CloudWatch Graph](./exampleGraph.png)


## Version Compatibility

### Currently in use by me with with: Hapi 16.1.0 (Node v6)

_I'll add tests for other hapi and node versions shortly_
