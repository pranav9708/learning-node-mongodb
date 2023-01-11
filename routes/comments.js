const express = require('express');
const route= express.Router();
const passport = require('passport');

const commentsController= require('../controllers/commentsController');

//check to not allow anyone to change html to add form
route.post('/create',passport.checkAuthentication,commentsController.create);

route.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy);
module.exports = route;