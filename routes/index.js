const router = require('express').Router();
const { UserNotFound } = require('../errors/not-found-err');

const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.use(userRoutes);
router.use(cardRoutes);

router.use('/*', (req, res, next) => {
  next(new UserNotFound());
});

module.exports = router;
