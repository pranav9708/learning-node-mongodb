const express = require('express');
const route= express.Router();
const passport = require('passport');

const postController= require('../controllers/postController');

//check to not allow anyone to change html to add form
route.post('/create',passport.checkAuthentication,postController.create);

route.get('/destroy/:id', passport.checkAuthentication,postController.destroy);

module.exports = route;