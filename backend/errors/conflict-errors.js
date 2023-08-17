class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.message = `При сохранении возникли конфликты ${message}`;
  }
}

module.exports = ConflictError;
