const router = require('express').Router();
const { getCards, createCard, deleteCard, likeCard, deleteLikeCard } = require('../controllers/cards');
const { celebrate, Joi } = require('celebrate');

router.get('/cards', getCards);

router.post('/cards', createCard);

router.delete('/cards/:cardId', deleteCard);

router.put('/cards/:cardId/likes', likeCard);

router.delete('/cards/:cardId/likes', deleteLikeCard);

module.exports = router;