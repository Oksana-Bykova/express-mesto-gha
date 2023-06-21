const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jsonWebToken = require('jsonwebtoken');
const UserNotFound = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request');
const Forbidden = require('../errors/forbidden');
const Unauthorized = require('../errors/unauthorized');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => new Unauthorized("Авторизуйтесь на сайте"));
};

const getUsersById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next();
        return;
      }
      res.status(200).send(user);
    })
    .catch(next);
};

const getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next();
        return;
      };
      res.status(200).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      User.create({ name, about, avatar, email, password: hashedPassword })
        .then((user) => res.status(201).send(user))
        .catch((err) => {
          if (err.message.includes('validation failed')) {
            next( new BadRequest("Данные некорректны"))
          }
        });
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
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
        next();
        return;
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        next();
        return;
      }
      res.send({ data: user });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password) {
    next();
    return;
  }
  User.findOne({ email })
    .select('+password')
    .orFail(() => new Error("Пользователь не найден"))
    .then((user) => {
      bcrypt.compare(String(password), user.password).then((isValidUser) => {
        if (isValidUser) {
          const jwt = jsonWebToken.sign({
            _id: user._id,
          }, process.env['JWT_SECRET']);
          res.cookie('jwt', jwt, {
            maxAge: 360000,
            httpOnly: true,
            sameSite: true,
          });
          res.send({data: user.toJSON()});
        } else {
          res.status(403).send({ message: "Неправильные данные для входа" });
        }
      });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getUserMe,
};
