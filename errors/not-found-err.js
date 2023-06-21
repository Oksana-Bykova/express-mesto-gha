class UserNotFound extends Error {
  constructor(err) {
    super(err);
    this.message = "Пользователь не найден";
    this.statusCode = 404;
  }
};

module.exports = {
  UserNotFound,
};