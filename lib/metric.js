const cloudwatchMetrics = require('cloudwatch-metrics');

exports.create = (options) => {
  cloudwatchMetrics.initialize({ region: 'eu-west-1' });

  return new cloudwatchMetrics.Metric(
    'api',
    'Milliseconds',
    [{ Name: 'environment', Value: process.env.NODE_ENV }],
    { enabled: options.enabled, sendCallback: console.log },
  );
};

exports.createDimensions = (request) => {
  const { path } = request.route;
  const { statusCode } = request.response;

  return [
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
};
