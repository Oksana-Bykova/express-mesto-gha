const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors/unauthorized');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new Unauthorized());
  }
  let payload;

  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    next(new Unauthorized('Авторизуйтесь на сайте'));
  }

  req.user = payload;

  next();
};

module.exports = auth;
