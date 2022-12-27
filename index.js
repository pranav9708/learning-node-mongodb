const express = require('express');
const cookieParser= require('cookie-parser');
const app = express();
//by default website run on port 80
const port =8000;
const expressLayout= require('express-ejs-layouts');


const db= require('./config/mongoose');
const session = require('express-session');
const passport =require('passport');
const passportLocal = require('./config/passport-local-statergy');
const { application } = require('express');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayout);

//extracting static files
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use('/',require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    // TODO change secret during deployment
    secret: 'blah',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000 *60 *100)

    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.listen(port, function(err){
    if(err){
        //interpolation using backtick ``
        console.log(`Error: ${err}`);
    }
    console.log(`Server is running on port ${port}`);
});