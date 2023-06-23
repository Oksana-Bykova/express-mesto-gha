class Forbidden extends Error {
  constructor(err) {
    super(err);
    this.message = 'Доступ запрещен';
    this.statusCode = 403;
  }
}

module.exports = {
  Forbidden,
};
