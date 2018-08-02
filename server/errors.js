class DatabaseError extends Error {
  constructor(message) {
    super();
    this.type = 'AppError';
    this.name = 'DatabaseError';
    this.message = message;
  }
}

class DatabaseNotFoundError extends Error {
  constructor(message) {
    super();
    this.type = 'AppError';
    this.name = 'DatabaseNotFoundError';
    this.message = message;
  }
}

class EntityNotFoundError extends Error {
  constructor(message) {
    super();
    this.type = 'AppError';
    this.name = 'EntityNotFoundError';
    this.message = message;
  }
}

class NegativeAmountError extends Error {
  constructor(message) {
    super();
    this.type = 'AppError';
    this.name = 'NegativeAmountError';
    this.message = message;
  }
}

module.exports = {
  DatabaseError,
  DatabaseNotFoundError,
  EntityNotFoundError,
  NegativeAmountError,
};
