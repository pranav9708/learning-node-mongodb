const passport= require('passport');
const googleStrategy= require('passport-google-oauth').OAuth2Strategy;
const crypto= require('crypto');
const User=require('../models/User');

//tell passport to use new strategy for google login
passport.use(new googleStrategy({
        //use these details for login
        clientID:"1022502796187-drtnad8t4a0ijnupi0h8p22kr571j2cr.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    //accesstoken-jwt was our access token so similarly google provide us a similar token, refreshToken: if accesstoken expires we use refreshtoken to get a new accesstoken 
    function(accessToken, refreshToken, profile,done){
        //find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("Error in google strategy-passport",err);
                return
            }
            console.log(profile);

            //if user exists login else singup user with email Id
            if(user){
                return done(null, user);
            }else{
                user.create({
                    name: profile.displayName,
                    email:profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log("Error in creating user using google passport-Strategy",err);
                        return
                    }
                    return done(null,user);
                })
            }
        })
    }

));

module.exports=passport;