const Card = require("../models/card");
const UserNotFound = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request');
const Forbidden = require('../errors/forbidden');
const Unauthorized = require('../errors/unauthorized');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  Card.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        next();
        return;
      } else if (req.params.cardId !== card.owner.toStrind()) {
        next();
        return;
      };
      res.status(200).send({ message: "Карточка успешно удалена" });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (!card) {
        next();
        return;
      }
      res.status(200).send({ message: "Лайк добавлен" });
    })
    .catch(next);
};

const deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (!card) {
        next();
        return;
      }
      res.status(200).send({ message: "Лайк убран" });
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLikeCard,
};
