const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    default: 'Жак',
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: 2,
    maxlength: 30,
  },
  about: {
    default: 'Исследователь',
    type: String,
    required: [true, 'Поле "about" должно быть заполнено'],
    minlength: 3,
    maxlength: 30,
  },
  avatar: {
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    type: String,
    required: [true, 'Поле "avatar" должно быть заполнено'],
   // validate: {
    //  validator: (v) =>  /https?:\/\/(www\.)?[a-z0-9\-._~:/?#[]@!$&'()*+,;=]{2,}\.[a-z0-9\/.]{2,}/gi.isEmail(v),
   //   message: "Проверьте правильность email"},
  },
  email: {
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true,
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Проверьте правильность email"}
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Поле "password" должно быть заполнено'],
  },
});

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;

  return user;
};

module.exports = mongoose.model('user', userSchema);