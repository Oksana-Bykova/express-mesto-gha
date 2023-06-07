const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) =>
      res.status(500).send({ message: "Server Error", err: err.message })
    );
};

const getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(400).send({ message: "Пользователь не найден" });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: "Server Error", err: err.message });
    });
};

const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.message.includes("validation failed")) {
        res.status(400).send({ message: "Введены некорректные данные" });
      } else {
        res.status(500).send({ message: "Server Error", err: err.message });
      }
    });
};

const updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        res.status(400).send({ message: "Пользователь не найден" });
        return;
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Данные некорректны" });
        return;
      }
      res.status(500).send({ message: "Произошла ошибка" });
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Пользователь не найден" });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateProfile,
  updateAvatar,
};
