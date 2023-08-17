const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET_KEY, salt } = require('../utils/constants');
const {
  BadRequestError, ConflictError, NotFoundError, AuthError,
} = require('../errors');

const getUsers = (req, res, next) => {
  User.find({})
    .then((allUsers) => res.send(allUsers))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new NotFoundError(`Пользователь по указанному id: ${userId} не найден`))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Некорректный id: ${userId} для поиска пользователя. Операция не выполнена.`));
      } else {
        next(err);
      }
    });
};

const getLoginUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(new NotFoundError(`Пользователь по указанному id: ${userId} не найден`))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Некорректный id: ${userId} для получения пользователя. Операция не выполнена.`));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, salt)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`При создании пользователя переданы некорректные данные.
        ${Object.values(err.errors).map((e) => e.message).join(', ')}`));
      } else if (err.code === 11000) {
        next(new ConflictError(`Указанный Email ${email} уже зарегистрирован`));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFoundError(`Пользователь по указанному id: ${userId} не найден`))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`При обновлении пользователя переданы некорректные данные.
            ${Object.values(err.errors).map((e) => e.message).join(', ')}`));
      } else { next(err); }
    });
};

const updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFoundError(`Пользователь по указанному id: ${userId} не найден`))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`При обновлении аватара переданы некорректные данные.
            ${Object.values(err.errors).map((e) => e.message).join(', ')}`));
      } else { next(err); }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(new AuthError('Передан неверный логин или пароль'))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Передан неверный логин или пароль');
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY, { expiresIn: '7d' });
          res.send({ token });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getLoginUser,
};
