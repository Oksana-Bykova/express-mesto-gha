const router = require('express').Router();
const { getUsers, getUsersById,  updateProfile, updateAvatar, getUserMe} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getUserMe);

router.get('/users/:userId', getUsersById);

//router.post('/signup', createUser);

router.patch('/users/me', updateProfile);

router.patch('/users/me/avatar', updateAvatar);

//router.post('/signin', login);

module.exports = router;