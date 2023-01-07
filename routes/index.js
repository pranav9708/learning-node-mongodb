const express=require('express');
const route=express.Router();
const homeController = require('../controllers/homecontroller');

console.log('router loaded');

route.get('/', homeController.home);

//specific to use users.js for any route after /users.
route.use('/users',require('./users'));

//specific to use posts.js for any route after /posts.
route.use('/posts',require('./posts'));

// route.get('/profile', homeController.profile);
route.use('/comments', require('./comments'));

module.exports =route;