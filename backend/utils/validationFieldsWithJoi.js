const { celebrate, Joi } = require('celebrate');
const { regexUrlValidation } = require('./regexes');
// users
const validGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).hex(),
  }),
});

const validUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(regexUrlValidation),
  }),
});

const validLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexUrlValidation),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// cards
const validCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regexUrlValidation),
  }),
});

const validDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
});

const validSetLike = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
});

const validUnsetLike = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
});

module.exports = {
  validGetUserById,
  validUpdateUser,
  validUpdateAvatar,
  validCreateCard,
  validDeleteCard,
  validSetLike,
  validUnsetLike,
  validLogin,
  validCreateUser,
};
