class UserNotFound extends Error {
  constructor(err) {
    super(err);
    this.message = 'Не найдено';
    this.statusCode = 404;
  }
}

module.exports = {
  UserNotFound,
};
