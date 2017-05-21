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

const defaultMetricsArgs = [
  'api',
  'Milliseconds',
  [{ Name: 'environment', Value: 'not set' }],
  { enabled: true },
];

test('default options', t => {
  metric.create();

  t.true(initializeSpy.calledOnce);
  t.true(metricSpy.calledOnce);
  t.true(initializeSpy.calledWith({ region: 'eu-west-1' }));
  t.true(metricSpy.calledWithMatch(...defaultMetricsArgs));
});

test('enabled false', t => {
  metric.create({ enabled: false });

  t.true(initializeSpy.calledOnce);
  t.true(metricSpy.calledOnce);
  t.true(initializeSpy.calledWith({ region: 'eu-west-1' }));
  const metricsArgs = [
    'api',
    'Milliseconds',
    [{ Name: 'environment', Value: 'not set' }],
    { enabled: false },
  ];
  t.true(metricSpy.calledWithMatch(...metricsArgs));
});

test('dev environment', t => {
  metric.create({ environmentName: 'dev' });

  t.true(initializeSpy.calledOnce);
  t.true(metricSpy.calledOnce);
  t.true(initializeSpy.calledWith({ region: 'eu-west-1' }));
  const metricsArgs = [
    'api',
    'Milliseconds',
    [{ Name: 'environment', Value: 'dev' }],
    { enabled: true },
  ];
  t.true(metricSpy.calledWithMatch(...metricsArgs));
});

test('us-east-1 region', t => {
  metric.create({ region: 'us-east-1' });

  t.true(initializeSpy.calledOnce);
  t.true(metricSpy.calledOnce);
  t.true(initializeSpy.calledWith({ region: 'us-east-1' }));
  t.true(metricSpy.calledWithMatch(...defaultMetricsArgs));
});
