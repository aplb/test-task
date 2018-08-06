module.exports = {
  server: {
    port: 3000,
  },
  validations: {
    transaction: {
      minAmount: 1,
      maxAmount: 10000,
    },
  },
  logs: {
    logLevel: 'silly',
  },
  cache: {
    ttl: 100,
  },
};
