'use strict';

const cloudwatchMetrics = require('cloudwatch-metrics');

exports.register = (server, options, next) => {
  cloudwatchMetrics.initialize({ region: 'eu-west-1' });

  const responseMetric = new cloudwatchMetrics.Metric(
    'api',
    'Milliseconds',
    [{ Name: 'environment', Value: process.env.NODE_ENV }],
    { enabled: options.enabled, sendCallback: console.log }
  );

  server.ext('onRequest', (request, reply) => {
    request.app.start = (new Date()).getTime();
    return reply.continue();
  });

  server.ext('onPreResponse', (request, reply) => {
    request.app.end = (new Date()).getTime();
    return reply.continue();
  });

  server.on('response', (request) => {
    const { path } = request.route;
    const { statusCode } = request.response;

    const dimensions = [
      {
        Name: 'path',
        Value: path,
      },
      {
        Name: 'statusCode',
        Value: `${statusCode}`,
      },
      {
        Name: 'method',
        Value: request.method,
      },
    ];

    responseMetric.put(request.app.end - request.app.start, 'responseTime', dimensions);
  });

  return next();
};

exports.register.attributes = {
  pkg: require('./package.json'),
};
