const packageJSON = require('./package.json');
const lifecycle = require('./lib/lifecycle');
const metric = require('./lib/metric');

exports.register = (server, options, next) => {
  const responseMetric = metric.create(options);

  server.ext('onRequest', lifecycle.setStartTime);
  server.ext('onPreResponse', lifecycle.setEndTime);

  server.on('response', request => {
    const dimensions = metric.createDimensions(request);
    responseMetric.put(request.app.end - request.app.start, 'responseTime', dimensions);
  });

  return next();
};

exports.register.attributes = {
  pkg: packageJSON,
};
