const express = require('express');
const route= express.Router();

const postController= require('../controllers/postController');

route.post('/create',postController.create);

module.exports = route;