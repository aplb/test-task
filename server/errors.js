class DatabaseError extends Error {
  constructor(message) {
    super();
    this.type = 'DatabaseError';
    this.name = 'DatabaseError';
    this.message = message;
  }
}

class DatabaseNotFoundError extends Error {
  constructor(message) {
    super();
    this.type = 'AppError';
    this.statusCode = 404;
    this.name = 'DatabaseNotFoundError';
    this.message = message;
  }
}

class EntityNotFoundError extends Error {
  constructor(message) {
    super();
    this.type = 'AppError';
    this.statusCode = 404;
    this.name = 'EntityNotFoundError';
    this.message = message;
  }
}

class NegativeAmountError extends Error {
  constructor() {
    super();
    this.type = 'AppError';
    this.statusCode = 400;
    this.name = 'NegativeAmountError';
    this.message = 'Transaction should not produce a negative balance.';
  }
}

class DatabaseTableLockedError extends Error {
  constructor() {
    super();
    this.type = 'DatabaseError';
    this.name = 'DatabaseTableLockedError';
    this.message = 'Table is locked.';
  }
}

module.exports = {
  DatabaseError,
  DatabaseNotFoundError,
  EntityNotFoundError,
  NegativeAmountError,
  DatabaseTableLockedError,
};
