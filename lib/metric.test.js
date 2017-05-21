import test from 'ava';
import sinon from 'sinon';
import cloudwatchMetrics from 'cloudwatch-metrics';

import metric from './metric';

const sandbox = sinon.sandbox.create();
let metricSpy;
let initializeSpy;

test.beforeEach(() => {
  initializeSpy = sandbox.spy(cloudwatchMetrics, 'initialize');
  metricSpy = sandbox.spy(cloudwatchMetrics, 'Metric');
});

test.afterEach.always(() => {
  sandbox.restore();
});

test('default options', t => {
  metric.create();
  t.true(initializeSpy.calledOnce);
  t.true(metricSpy.calledOnce);
  t.true(initializeSpy.calledWith({ region: 'eu-west-1' }));
  const defaultArgs = [
    'api',
    'Milliseconds',
    [{ Name: 'environment', Value: 'not set' }],
    { enabled: true },
  ];
  t.true(metricSpy.calledWithMatch(...defaultArgs));
});
