class Unauthorized extends Error {
  constructor(message) {
    super(message);
    //this.message = "Авторизуйтесь на сайте";
    this.statusCode = 401;
  }
};

module.exports = {
  Unauthorized,
};