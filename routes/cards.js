const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLikeCard,
} = require('../controllers/cards');

const { RegURL } = require('../utils/constants');

const idValid = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

router.get('/cards', getCards);

router.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(RegURL),
    }),
  }),
  createCard,
);

router.delete('/cards/:cardId', idValid, deleteCard);

router.put('/cards/:cardId/likes', idValid, likeCard);

router.delete('/cards/:cardId/likes', idValid, deleteLikeCard);

module.exports = router;
