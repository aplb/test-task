const express = require('express');
const bodyParser = require('body-parser');
const { server } = require('config');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.state = {};
  next();
});

require('./routes/transactions')(app);
// require('./routes/account')(app);

app.get('/', (req, res) => {
  res.json({ ok: true });
});

// add notFound & errorHandler

app.use(errorHandler);

app.listen(server.port, () => {
  // console.log('----------', 'app listening');
});
