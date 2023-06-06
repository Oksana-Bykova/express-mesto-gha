const Card = require("../models/card");

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) =>
      res.status(500).send({ message: "Server Error", err: err.message })
    );
};

const createCard = (req, res) => {
  Card.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.message.includes("validation failed")) {
        res.status(400).send({ message: "Введены некорректные данные" });
      } else {
        res.status(500).send({ message: "Server Error", err: err.message });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove (req.params.id)
  .then((card) => res.status(202).send({ message: "Карточка успешно удалена" }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
};

const deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLikeCard,
};
