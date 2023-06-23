const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUsersById,
  updateProfile,
  updateAvatar,
  getUserMe,
} = require('../controllers/users');
const { RegURL } = require('../utils/constants');

const idValid = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

router.get('/users', idValid, getUsers);

router.get('/users/me', getUserMe);

router.get('/users/:userId', getUsersById);

router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(3).max(30),
    }),
  }),
  updateProfile,
);

router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(RegURL),
    }),
  }),
  updateAvatar,
);

module.exports = router;
