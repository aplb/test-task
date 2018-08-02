const { isCelebrate } = require('celebrate');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (isCelebrate(err)) {
    res.status(400);
  } else if (
    err.name === 'EntityNotFoundError' ||
    err.name === 'DatabaseNotFoundError'
  ) {
    res.status(404);
  } else {
    res.status(500);
  }

  res.json({ success: false, message: err.message });
};
