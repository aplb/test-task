const express = require('express');
const bodyParser = require('body-parser');
const expressWinston = require('express-winston');
const { server } = require('config');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./logger');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.state = {};
  next();
});

app.use(
  expressWinston.logger({
    winstonInstance: logger,
  })
);

require('./routes/transactions')(app);
// require('./routes/account')(app);

app.get('/', (req, res) => {
  res.json({ ok: true });
});

app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
    exceptionToMeta: function(error) {
      return {
        stack: error.stack && error.stack.split('\n'),
      };
    },
  })
);

// add notFound

app.use(errorHandler);

process.on('uncaughtException', err => {
  logger.error(err.message);
  logger.error(err.stack);
  process.exit(100);
});

app.server = app.listen(server.port, () => {
  logger.info(`App listening on port: ${server.port}.....`, { tags: 'server' });
});

module.exports = app;
