class DatabaseError extends Error {
  constructor() {
    super();
    this.type = 'AppError';
    this.name = 'DatabaseError';
    this.message = '';
  }
}

module.exports = {
  DatabaseError,
};
