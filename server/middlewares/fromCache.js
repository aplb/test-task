const { getKey } = require('../services/cache');

module.exports = (options = {}) => async (req, res, next) => {
  try {
    const res = await getKey(options.key);
    if (res) {
      req.state.toRespond = JSON.parse(res);
    }
    next();
  } catch (err) {
    next(err);
  }
};
