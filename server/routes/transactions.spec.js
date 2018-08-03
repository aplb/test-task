const request = require('supertest');
const mockData = require('../seed');
const { DatabaseNotFoundError } = require('../errors');

const mockDBInst = {
  getAllTransactions: jest.fn(() => Promise.resolve(mockData)),
  getSingleTransaction: jest.fn(() =>
    Promise.resolve(Object.values(mockData)[0])
  ),
};

jest.mock('../db', () => mockDBInst);

describe('transactions', () => {
  let app;
  beforeEach(() => {
    app = require('../index');
  });

  afterEach(() => {
    app.server.close();
  });

  test('should return list of transactions', () => {
    return request(app)
      .get('/transaction')
      .expect('Content-Type', /json/)
      .then(res => {
        ensureSuccess(res);
        expect(mockDBInst.getAllTransactions).toHaveBeenCalled();
        expect(res.body.result.length).toEqual(10);
      });
  });

  test('should return empty list', () => {
    // TODO: add eslint-jest-plugin
    mockDBInst.getAllTransactions.mockResolvedValueOnce(null);

    return request(app)
      .get('/transaction')
      .expect('Content-Type', /json/)
      .then(res => {
        ensureSuccess(res);
        expect(mockDBInst.getAllTransactions).toHaveBeenCalled();
        expect(res.body.result.length).toEqual(0);
      });
  });

  test('should handle general error', () => {
    mockDBInst.getAllTransactions.mockRejectedValueOnce(new Error());

    return request(app)
      .get('/transaction')
      .then(res => {
        ensureError(res);
        expect(mockDBInst.getAllTransactions).toHaveBeenCalled();
      });
  });

  test('should return single transaction', () => {
    return request(app)
      .get('/transaction/97d6a157-5f61-45f5-8543-40f9d67e7fd6')
      .expect('Content-Type', /json/)
      .then(res => {
        ensureSuccess(res);
        expect(mockDBInst.getSingleTransaction).toHaveBeenCalled();
        expect(res.body.result).toBeTruthy();
      });
  });

  test('should throw not EntityNotFound error', () => {
    mockDBInst.getSingleTransaction.mockResolvedValue(null);

    return request(app)
      .get('/transaction/97d6a157-5f61-45f5-8543-40f9d67e7fd6')
      .then(res => {
        ensureError(res, 404, 'Requested transaction not found.');
        expect(mockDBInst.getSingleTransaction).toHaveBeenCalled();
      });
  });

  test('should throw not DatabaseEntityNotFound error', () => {
    mockDBInst.getSingleTransaction.mockRejectedValue(
      new DatabaseNotFoundError('No transaction found.')
    );

    return request(app)
      .get('/transaction/97d6a157-5f61-45f5-8543-40f9d67e7fd6')
      .then(res => {
        ensureError(res, 404, 'No transaction found.');
        expect(mockDBInst.getSingleTransaction).toHaveBeenCalled();
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

const ensureError = (res, status = 500, message = '') => {
  expect(res.status).toEqual(status);
  expect(res.body.success).toBe(false);
  expect(res.body.message).toEqual(message);
};
