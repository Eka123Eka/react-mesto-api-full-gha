const router = require('express').Router();
const userRoute = require('./users');
const cardRoute = require('./cards');

const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors');
const { validCreateUser, validLogin } = require('../utils/validationFieldsWithJoi');

router.post('/signup', validCreateUser, createUser);
router.post('/signin', validLogin, login);

router.use('/users', auth, userRoute);
router.use('/cards', auth, cardRoute);
router.use('*', auth, (req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
