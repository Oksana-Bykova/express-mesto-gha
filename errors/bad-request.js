class BadRequest extends Error {
  constructor(err) {
    super(err);
    this.message = 'Данные некорректны';
    this.statusCode = 400;
  }
}

module.exports = {
  BadRequest,
};
