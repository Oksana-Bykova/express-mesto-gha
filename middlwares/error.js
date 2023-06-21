const { exists } = require("../models/user");

const errorHandler = (err, req, res, next) => {
  let error;
  if (err.statusCode === 404) {
    error = new UserNotFound(err);
  }
  if (err.statusCode === 400) {
    error = new BadRequest(err);
  }
  if (err.statusCode === 403) {
    error = new Forbidden(err);
  }
  if (err.statusCode === 401) {
    error = new Unauthorized(err);
  }
  if (err.code === 11000) {
  }
  res.status(500).send({ err: err.message });
  next();
};

module.exports = errorHandler;
