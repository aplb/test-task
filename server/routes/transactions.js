const { celebrate } = require('celebrate');
const conditional = require('express-conditional-middleware');
const { EntityNotFoundError } = require('../errors');
const sendResponse = require('../middlewares/sendResponse');
const shouldRespond = require('../middlewares/shouldRespond');
const {
  getAllTransactions,
  getSingleTransaction,
  createTransaction,
  // deleteTransaction,
} = require('../db');
const {
  createTransaction: createTransactionSchema,
  getSingleTransaction: getSingleTransactionSchema,
  options,
} = require('../validations/transactionSchema');

module.exports = function(app) {
  app.get(
    '/transaction',
    async (req, res, next) => {
      try {
        const list = await getAllTransactions();
        req.state.toRespond = toArray(list);
        next();
      } catch (err) {
        next(err, req, res);
      }
    },
    conditional(shouldRespond, sendResponse)
  );

  app.get(
    '/transaction/:id',
    celebrate({ params: getSingleTransactionSchema }, options),
    async (req, res, next) => {
      try {
        const transact = await getSingleTransaction(req.params.id);
        if (!transact) {
          throw new EntityNotFoundError('Requested transaction not found.');
        }

        req.state.toRespond = transact;
        next();
      } catch (err) {
        next(err, req, res);
      }
    },
    conditional(shouldRespond, sendResponse)
  );

  app.post(
    '/transaction',
    celebrate({ body: createTransactionSchema }, options),
    // checkNegativeAmount
    async (req, res, next) => {
      const payload = req.body;
      try {
        const transact = await createTransaction(payload);
        req.state.toRespond = { result: transact, status: 201 };
        next();
      } catch (err) {
        next(err, req, res);
      }
    },
    conditional(shouldRespond, sendResponse)
  );

  app.delete('/transaction/:id', async (req, res) => {
    res.json({ msg: 'DEL ONE TR' });
  });
};

// helpers
const toArray = table => Object.values(table);
