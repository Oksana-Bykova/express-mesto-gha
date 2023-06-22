class Unauthorized extends Error {
  constructor(err) {
    super(err);
    this.message = 'Авторизуйтесь';
    this.statusCode = 401;
  }
};

module.exports = {
  Unauthorized,
};