const express = require('express');
const route = express.Router();

const usersController= require('../controllers/usersController');

route.get('/profile',usersController.profile);
// route.get('/posts',usersController.post);


module.exports = route;
