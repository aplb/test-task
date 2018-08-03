const request = require('supertest');
// mockDB

describe('transactions', () => {
  let app;
  beforeEach(() => {
    app = require('../index');
  });

  afterEach(() => {
    app.server.close();
  });

  test('should', () => {
    return request(app)
      .get('/transaction')
      .expect('Content-Type', /json/)
      .then(res => {
        ensureSuccess(res);
        expect(res.body.result.length).toEqual(0);
      });
  });
});

const ensureSuccess = (res, status) => {
  if (status) {
    expect(res.status).toEqual(status);
  } else {
    expect(res.status).toEqual(200);
  }
  expect(res.body.success).toBe(true);
};
