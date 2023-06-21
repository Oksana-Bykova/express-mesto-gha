const { exists } = require("../models/user");

const errorHandler = (err, req, res, next) => {
  res.status(500).send({ err: err.message });
  next(err);
};

module.exports = errorHandler;
