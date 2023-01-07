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

// const MongoStore = require('connect-mongo')(session);
const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');

//need to be mentioned before server starts
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayout);


//extracting static files
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    // TODO change secret during deployment
    // key used to encrypt cookie
    secret: 'blah',
    //to avoid saving session cookie when user not logged in
    saveUninitialized: false,
    //prevent saving same cookie again and again
    resave: false,
    cookie:{
        maxAge:(1000 *60 *100)

    },
    store: MongoStore.create(
        {
            mongoUrl: db._connectionString,
            // mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'));

app.listen(port, function(err){
    if(err){
        //interpolation using backtick ``
        console.log(`Error: ${err}`);
    }
    console.log(`Server is running on port ${port}`);
});