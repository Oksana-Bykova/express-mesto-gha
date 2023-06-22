//const { exists } = require("../models/user");
const {Unauthorized} = require("../errors/unauthorized");
const { UserNotFound } = require("../errors/not-found-err");
const {BadRequest} = require("../errors/bad-request");
const {Forbidden} = require("../errors/forbidden");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  let error;
  if(err.statusCode === 401) {
    error = new Unauthorized(err);
  };
  if(err.statusCode === 404) {
    error = new UserNotFound(err);
  };
  if(err.statusCode === 403) {
    error = new Forbidden(err);
  };
  if(err.statusCode === 400) {
    error = new BadRequest (err);
  };
  res.status(err.statusCode).send({ message: err.message });
  next();
};

module.exports = errorHandler;
