import test from 'ava';
import Hapi from 'hapi';

import lifecycle from './lifecycle';

const createHapiServer = () => {
  const server = new Hapi.Server();
  server.connection({ port: 3000 });

  server.ext('onRequest', lifecycle.setStartTime);
  server.ext('onPreResponse', lifecycle.setEndTime);

  server.route({ method: 'GET', path: '/', handler: (request, reply) => reply(request.app) });

  return server;
};

test('startTime is set in request.app', async t => {
  const server = createHapiServer();
  const { result } = await server.inject({ url: '/' });
  t.truthy(result.startTime);
});

test('endTime is set in request.app', async t => {
  const server = createHapiServer();
  const { result } = await server.inject({ url: '/' });
  t.truthy(result.endTime);
});

test('endTime is after startTime', async t => {
  const server = createHapiServer();
  const { result } = await server.inject({ url: '/' });
  t.truthy(result.endTime >= result.startTime);
});
