module.exports = function(req, res) {
  const response = {
    success: true,
    result: req.state.toRespond,
  };
  res.json(response);
};
