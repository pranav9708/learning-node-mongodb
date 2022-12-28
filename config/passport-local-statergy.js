const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//to fetch Users from DB
const User = require('../models/User');

//authentication using passport
passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function (email, password, done) {
        //find a user and establish the identity

        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('Error in finding user --> Passport');
                //done -> 1st parameter is error 2nd parameter is authentication
                return done(err);
            }

            if (!user || user.password != password) {
                console.log('Invalid Username/password');
                return done(null, false);
            }
            //return to serialzeUSer 
            return done(null, user);
        })

    }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);//takes in user.id and encrypts it using express session in main index.js
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null,user);
    })
});

//check if user is authenticated
passport.checkAuthentication =function(req,res,next){
    //if user is signed in,then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from session cookie and we are 
        // just passing this to the locals for the views
        res.locals.user =req.user;
    }
    next();
}

module.exports = passport;