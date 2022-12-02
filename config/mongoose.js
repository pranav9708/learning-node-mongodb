const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0/codeial_development');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to MongoDB'));

db.once('open',function(){
    console.log('successfully connected to MongoDB');
});

module.exports =db;