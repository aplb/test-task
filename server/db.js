const uuid = require('uuid/v4');
const { DatabaseNotFoundError } = require('./errors');
const seed = require('./seed');

let data = {};

if (process.env.NODE_ENV === 'development') {
  data = seed;
}

const getAllTransactions = () => Promise.resolve(data);

const getSingleTransaction = id => {
  const transact = data[id];
  if (!transact) {
    return Promise.reject(new DatabaseNotFoundError('No transaction found.'));
  }
  return Promise.resolve(transact);
};

const createTransaction = payload => {
  // withLock
  const transact = Object.assign(
    {},
    {
      id: uuid(),
      effectiveDate: new Date(),
    },
    payload
  );
  data[transact.id] = transact;
  // unlock
  return Promise.resolve(transact);
};

const deleteTransaction = id => {
  const transact = data[id];
  if (!transact) {
    return Promise.reject(new DatabaseNotFoundError('No transaction found.'));
  }
  delete data[id];
  return Promise.resolve(transact);
};

module.exports = {
  getAllTransactions,
  getSingleTransaction,
  createTransaction,
  deleteTransaction,
};
