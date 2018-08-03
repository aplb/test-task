const request = require('supertest');
const mockData = require('../seed');
const { DatabaseNotFoundError } = require('../errors');

const mockDBInst = {
  getAllTransactions: jest.fn(() => Promise.resolve(mockData)),
  getSingleTransaction: jest.fn(() =>
    Promise.resolve(Object.values(mockData)[0])
  ),
  createTransaction: jest.fn(() => ({})),
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

  describe('Transaction: find all', () => {
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
  });

  describe('Transaction: get one', () => {
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

  describe('Transaction: create', () => {
    test('should bypass checks and create `debit` transaction', () => {
      const body = { type: 'debit', amount: 100 };
      mockDBInst.createTransaction.mockResolvedValueOnce(body);

      return request(app)
        .post('/transaction')
        .send(body)
        .then(res => {
          ensureSuccess(res, 201);
          expect(res.body.result).toEqual(expect.objectContaining(body));
        });
    });

    test('should fail checks for out-of-positive balance `credit`', () => {
      const body = { type: 'credit', amount: 1000 };

      return request(app)
        .post('/transaction')
        .send(body)
        .then(res => {
          ensureError(
            res,
            400,
            'Transaction should not produce a negative balance.'
          );
        });
    });

    test('should handle general error', () => {
      const body = { type: 'credit', amount: 100 };
      mockDBInst.getAllTransactions.mockRejectedValueOnce(new Error());

      return request(app)
        .post('/transaction')
        .send(body)
        .then(res => {
          ensureError(res, 500);
        });
    });
  });
});

const ensureSuccess = (res, status = 200) => {
  expect(res.status).toEqual(status);
  expect(res.body.success).toBe(true);
};

const ensureError = (res, status = 500, message = '') => {
  expect(res.status).toEqual(status);
  expect(res.body.success).toBe(false);
  expect(res.body.message).toEqual(message);
};
