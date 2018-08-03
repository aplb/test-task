const ensureSuccess = (res, status = 200) => {
  expect(res.status).toEqual(status);
  expect(res.body.success).toBe(true);
};

const ensureError = (res, status = 500, message = '') => {
  expect(res.status).toEqual(status);
  expect(res.body.success).toBe(false);
  expect(res.body.message).toEqual(message);
};

module.exports = {
  ensureSuccess,
  ensureError,
};
