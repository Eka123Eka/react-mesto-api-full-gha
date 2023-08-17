const handleError = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({
      message: err.message,
    });
  } else {
    res.status(500).send({
      message: 'На сервере возникла непредвиденная ошибка.',
    });
  }
  next();
};

module.exports = handleError;
