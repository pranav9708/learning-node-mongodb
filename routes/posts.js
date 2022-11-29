const express = require('express');
const route= express.Router();

const postController= require('../controllers/postController');

route.get('/',postController.post);

module.exports = route;