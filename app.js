require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const router = require('./routes');
const errorHandler = require('./middlwares/error');
const app = express();
const auth = require('./middlwares/auth');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const { login, createUser } = require('./controllers/users');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());



app.post('/signup', createUser);
app.post('/signin', login);
app.use(cookieParser());
app.use(auth);


app.use(router);
app.use(errors());
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Слушаю порт 3001")
});
