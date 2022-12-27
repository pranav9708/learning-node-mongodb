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

            return done(null, user);
        })

    }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);//automatically encrypts userid
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

module.exports = passport;