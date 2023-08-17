const router = require('express').Router();
const {
  validCreateCard,
  validDeleteCard,
  validSetLike,
  validUnsetLike,
} = require('../utils/validationFieldsWithJoi');

const {
  getCards,
  createCard,
  deleteCard,
  setLike,
  unsetLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:cardId', validDeleteCard, deleteCard);
router.post('/', validCreateCard, createCard);
router.put('/:cardId/likes', validSetLike, setLike);
router.delete('/:cardId/likes', validUnsetLike, unsetLike);

module.exports = router;
