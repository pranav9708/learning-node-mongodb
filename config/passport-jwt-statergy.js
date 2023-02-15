const passport = require('passport');
const JWTStrategy= require('passport-jwt').Strategy;
//module to help extract jwt from header
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

let opts={
    //headers-list of key -one such key is authorization which is also a list of key and bearer is one of the key
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: 'codeial'
}

passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id, function(err,user){
        if(err){
            console.log('Error in finding user from JWT');
            return;
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    })
}))

module.exports=passport;