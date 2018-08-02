module.exports = function(req, res) {
  const response = {
    success: true,
  };
  const status = req.state.toRespond.status;

  if (status) {
    res.status(status);
    response.result = req.state.toRespond.result;
  } else {
    response.result = req.state.toRespond;
  }

  res.json(response);
};
