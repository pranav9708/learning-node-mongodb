const kue=require('kue');
const { model } = require('mongoose');

const queue=kue.createQueue();

module.exports=queue;