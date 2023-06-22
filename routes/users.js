const router = require("express").Router();
const {
  getUsers,
  getUsersById,
  updateProfile,
  updateAvatar,
  getUserMe,
} = require("../controllers/users");
const { celebrate, Joi } = require("celebrate");

router.get("/users", getUsers);

router.get("/users/me", getUserMe);

router.get("/users/:userId", getUsersById);

router.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(3).max(30),
      avatar: Joi.string().regex(
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,}\.[a-zA-Z0-9()]{2,}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/m
      ),
    }),
  }),
  updateProfile
);

router.patch("/users/me/avatar", updateAvatar);

//router.post('/signin', login);

module.exports = router;
