exports.setStartTime = (request, reply) => {
  request.app.start = (new Date()).getTime();
  return reply.continue();
};

exports.setEndTime = (request, reply) => {
  request.app.end = (new Date()).getTime();
  return reply.continue();
};
