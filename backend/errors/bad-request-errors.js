class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.message = `При выполнении запроса возникли ошибки ${message}`;
  }
}

module.exports = BadRequestError;
