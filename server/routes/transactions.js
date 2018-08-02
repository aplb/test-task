// require DB

module.exports = function(app) {
  app.get('/transaction', async (req, res) => {
    res.json({ msg: 'list all TR' });
  });
  app.get('/transaction/:id', async (req, res) => {
    res.json({ msg: 'list ONE TR' });
  });
  app.post('/transaction', async (req, res) => {
    res.json({ msg: 'create TR' });
  });
  app.delete('/transaction/:id', async (req, res) => {
    res.json({ msg: 'DEL ONE TR' });
  });
};
