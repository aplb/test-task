const { celebrate } = require('celebrate');
const conditional = require('express-conditional-middleware');
const { EntityNotFoundError, NegativeAmountError } = require('../errors');
const sendResponse = require('../middlewares/sendResponse');
const shouldRespond = require('../middlewares/shouldRespond');
const {
  getAllTransactions,
  getSingleTransaction,
  createTransaction,
  deleteTransaction,
} = require('../db');
const {
  createTransaction: createTransactionSchema,
  getSingleTransaction: getSingleTransactionSchema,
  options,
} = require('../validations/transactionSchema');
const useCache = require('../middlewares/useCache');
const fromCache = require('../middlewares/fromCache');
const cleanCache = require('../middlewares/cleanCache');

module.exports = function(app) {
  app.get(
    '/transaction',
    fromCache({ key: 'transactions' }),
    conditional(shouldRespond, sendResponse),
    async (req, res, next) => {
      try {
        const list = await getAllTransactions();
        if (list) {
          req.state.toRespond = toArray(list);
        } else {
          req.state.toRespond = [];
        }
        next();
      } catch (err) {
        next(err, req, res);
      }
    },
    conditional(shouldRespond, useCache({ key: 'transactions' })),
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
    checkNegativeAmount,
    async (req, res, next) => {
      const payload = req.body;
      try {
        const transact = await createTransaction(payload);
        req.state.toRespond = { result: transact, status: 201 };
        next();
      } catch (err) {
        next(err);
      }
    },
    cleanCache({ key: 'transactions' }),
    conditional(shouldRespond, sendResponse)
  );

  app.delete(
    '/transaction/:id',
    celebrate({ params: getSingleTransactionSchema }, options),
    // fetch TR we going to delete
    async (req, res, next) => {
      try {
        const transact = await getSingleTransaction(req.params.id);
        req.state.transact = transact;
        next();
      } catch (err) {
        next(err);
      }
    },
    checkNegativeAmount,
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const transact = await deleteTransaction(id);
        req.state.toRespond = transact;
        next();
      } catch (err) {
        next(err);
      }
    },
    conditional(shouldRespond, sendResponse)
  );
};

async function checkNegativeAmount(req, res, next) {
  const { type, amount } = getTransactionDetailsFromRequest(req);
  if (shouldPassNegativeBalanceCheck(req, type)) {
    return next();
  }

  try {
    const total = await getTotal();
    if (isNextTotalNegative(total, amount, type, req)) {
      return next(new NegativeAmountError());
    }
    next();
  } catch (err) {
    next(err);
  }
}

async function getTotal() {
  const list = await getAllTransactions();
  return toArray(list).reduce((acc, tr) => {
    if (tr.type === 'debit') {
      acc += tr.amount;
    } else {
      acc -= tr.amount;
    }
    return acc;
  }, 0);
}

// helpers
const toArray = table => Object.values(table);

const getTransactionDetailsFromRequest = req => {
  return req.state.transact || req.body;
};

const shouldPassNegativeBalanceCheck = (req, trType) => {
  if (trType === 'debit' && req.method === 'POST') {
    return true;
  }

  if (trType === 'credit' && req.method === 'DELETE') {
    return true;
  }

  return false;
};

const isNextTotalNegative = (currTotal, amount, trType, req) => {
  let sum;
  if (trType === 'credit') {
    if (req.method === 'DELETE') {
      sum = currTotal + amount;
    }
    if (req.method === 'POST') {
      sum = currTotal - amount;
    }
  } else {
    if (req.method === 'DELETE') {
      sum = currTotal - amount;
    }
    if (req.method === 'POST') {
      sum = currTotal + amount;
    }
  }

  return sum < 0;
};
