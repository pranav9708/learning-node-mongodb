const express = require('express');
const route = express.Router();
const passport= require('passport');

const usersController= require('../controllers/usersController');

route.get('/profile',usersController.profile);
// route.get('/posts',usersController.post);

route.get('/sign-in',usersController.signIn);

route.get('/sign-up',usersController.signUp);

route.post('/create', usersController.create);

//use passport as a middleware for authentication
//if passport is done it will move to next controller else throw an error
route.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), usersController.createSession);

module.exports = route;

