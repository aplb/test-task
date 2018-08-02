const express = require('express');
const bodyParser = require('body-parser');
const { server } = require('config');

const app = express();
app.use(bodyParser.json());

require('./routes/transactions')(app);

app.get('/', (req, res) => {
  res.json({ ok: true });
});

// add notFound & errorHandler

app.listen(server.port, () => {
  // console.log('----------', 'app listening');
});
