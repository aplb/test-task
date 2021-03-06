const { setKey } = require('../services/cache');

module.exports = (options = {}) => async (req, res, next) => {
  try {
    await setKey(options.key || '', req.state.toRespond);
    next();
  } catch (err) {
    next(err);
  }
};
