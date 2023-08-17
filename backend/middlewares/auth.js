const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors');

const { JWT_SECRET_KEY } = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Для продолжения требуется авторизоваться');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    next(new AuthError('Для продолжения необходимо авторизоваться'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
