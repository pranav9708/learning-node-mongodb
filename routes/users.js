const express = require('express');
const route = express.Router();

const usersController= require('../controllers/usersController');

route.get('/profile',usersController.profile);
// route.get('/posts',usersController.post);

route.get('/sign-in',usersController.signIn);

route.get('/sign-up',usersController.signUp);

route.post('/create', usersController.create);

route.post('/create-session',usersController.createSession);

route.post('/sign-out',usersController.signOut);

module.exports = route;

