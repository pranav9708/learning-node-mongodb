const express=require('express');
const route=express.Router();
const homeController = require('../controllers/homecontroller');

console.log('router loaded');

route.get('/', homeController.home);
// route.get('/profile', homeController.profile);


module.exports =route;