const express = require('express');
const route = express.Router();

const usersController= require('../controllers/usersController');

route.get('/profile',usersController.profile);
// route.get('/posts',usersController.post);

route.get('/sign-in',usersController.signIn);

route.get('/sign-up',usersController.signUp);
module.exports = route;
