const { celebrate } = require('celebrate');
const { EntityNotFoundError } = require('../errors');
const {
  getAllTransactions,
  getSingleTransaction,
  // createTransaction,
  // deleteTransaction,
} = require('../db');
const {
  getSingleTransaction: getSingleTransactionSchema,
  options,
} = require('../validations/transactionSchema');

module.exports = function(app) {
  app.get('/transaction', async (req, res, next) => {
    try {
      const list = await getAllTransactions();
      res.json({ success: true, result: toArray(list) });
    } catch (err) {
      next(err, req, res);
    }
  });
  app.get(
    '/transaction/:id',
    celebrate({ params: getSingleTransactionSchema }, options),
    async (req, res, next) => {
      try {
        const transact = await getSingleTransaction(req.params.id);
        if (!transact) {
          throw new EntityNotFoundError('Requested transaction not found.');
        }
        res.json({ success: true, result: transact });
      } catch (err) {
        next(err, req, res);
      }
    }
  );
  app.post('/transaction', async (req, res) => {
    res.json({ msg: 'create TR' });
  });
  app.delete('/transaction/:id', async (req, res) => {
    res.json({ msg: 'DEL ONE TR' });
  });
};

// helpers
const toArray = table => Object.values(table);
