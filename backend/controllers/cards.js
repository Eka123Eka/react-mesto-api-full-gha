const Card = require('../models/card');

const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require('../errors');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('При создании карточки переданы некорректные данные.'));
      } else { next(err); }
    });
};

const deleteCard = (req, res, next) => {
  const owner = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(new NotFoundError(`Карточка с указанным id: ${cardId} не найдена`))
    .then((deletedCard) => {
      if (deletedCard.owner.toString() !== owner) {
        throw new ForbiddenError(`Карточка с указанным id: ${cardId} размещена не вашим пользователем. Удаление невозможно.`);
      }
      res.send(deletedCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Некорректный id карточки: ${cardId}`));
      } else { next(err); }
    });
};

const setLike = (req, res, next) => {
  const owner = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .orFail(new NotFoundError(`Карточка с указанным id: ${cardId} не найдена`))
    .then((updateCard) => res.send(updateCard))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Переданы некорректные данные для установки лайка: ${cardId}`));
      } else { next(err); }
    });
};

const unsetLike = (req, res, next) => {
  const owner = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: owner } },
    { new: true },
  )
    .orFail(new NotFoundError(`Карточка с указанным id: ${cardId} не найдена`))
    .then((updateCard) => res.send(updateCard))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Переданы некорректные данные для снятия лайка: ${cardId}`));
      } else { next(err); }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  unsetLike,
};
