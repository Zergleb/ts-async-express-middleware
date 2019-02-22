import test from 'ava';
import express from 'express';
import request from 'supertest';
import asyncMiddleware from '.';

const app = express();

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function errorHandler(err, req, res, next) {
  res
    .status(500)
    .send(err.message + ' - this part was added by the error handler');
}

app.get(
  '/pass',
  asyncMiddleware(async (_req, res, _next) => {
    await delay(0);
    res.send('this passed');
  })
);

app.get(
  '/fail',
  asyncMiddleware(async (_req, _res, _next) => {
    throw new Error('This is an error');
  })
);
app.use(errorHandler);

test('/test async middleware works', async t => {
  const response = await request(app).get('/pass');
  t.is(response.status, 200);
  const fail = await request(app).get('/fail');
  t.is(fail.status, 500);
  t.is(
    fail.text,
    'This is an error - this part was added by the error handler'
  );
});
