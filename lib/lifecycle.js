exports.setStartTime = (request, reply) => {
  request.app.startTime = (new Date()).getTime();
  return reply.continue();
};

exports.setEndTime = (request, reply) => {
  request.app.endTime = (new Date()).getTime();
  return reply.continue();
};
