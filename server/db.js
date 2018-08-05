const uuid = require('uuid/v4');
const { DatabaseNotFoundError, DatabaseTableLockedError } = require('./errors');
const seed = require('./seed');

let data = {};

if (process.env.NODE_ENV === 'development') {
  data = seed;
}

const getAllTransactions = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });

const getSingleTransaction = id => {
  const transact = data[id];
  if (!transact) {
    return Promise.reject(new DatabaseNotFoundError('No transaction found.'));
  }
  // return Promise.resolve(transact);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(transact);
    }, 1000);
  });
};

const createTransaction = payload => {
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

let locked = false;

const withLock = fn => (...args) => {
  if (locked) {
    throw new DatabaseTableLockedError();
  }
  locked = true;
  try {
    return fn(...args);
  } catch (err) {
    throw err;
  } finally {
    locked = false;
  }
};

module.exports = {
  getAllTransactions: withLock(getAllTransactions),
  getSingleTransaction: withLock(getSingleTransaction),
  createTransaction: withLock(createTransaction),
  deleteTransaction: withLock(deleteTransaction),
};
