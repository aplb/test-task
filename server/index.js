const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

require('./routes/transactions')(app);

app.get('/', (req, res) => {
  res.json({ ok: true });
});

// add notFound & errorHandler

app.listen(3000, () => {
  // console.log('----------', 'app listening');
});
