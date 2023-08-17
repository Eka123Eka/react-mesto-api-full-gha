class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.message = `Недостаточно прав для выполнения операции. ${message}`;
  }
}
module.exports = ForbiddenError;
