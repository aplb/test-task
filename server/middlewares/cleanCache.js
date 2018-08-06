const { delKey } = require('../services/cache');

module.exports = (options = {}) => async (req, res, next) => {
  try {
    await delKey(options.key);
    next();
  } catch (err) {
    next(err);
  }
};
