class DatabaseError extends Error {
  constructor(message) {
    super();
    this.type = 'AppError';
    this.name = 'DatabaseError';
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

module.exports = {
  DatabaseError,
  EntityNotFoundError,
};
