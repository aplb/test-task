module.exports = function(req) {
  return !!req.state.toRespond;
};
