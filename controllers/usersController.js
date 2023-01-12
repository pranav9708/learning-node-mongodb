const User=require('../models/User');

module.exports.profile= function(req, res){
    User.findById(req.params.id,function(err, user){
        return res.render('profile',{
            title: 'User Profile',
            profile_user: user
        });
    })
}

module.exports.update = function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        })
    }else{
        return res.status(401).send('Unauthorized');
    }
}

module.exports.signIn= function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title:'Codeial | Sign In'
    })
}

module.exports.signUp= function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title:'Codeial | Sign Up'
    })
}

//get the sign up data
module.exports.create=function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("error in finding user in signing up");
            return;
        }

        if(!user){
            console.log(req.body);

            User.create(req.body, function(err,user){
                if(err){
                    console.log("error in creating user while signing up");
                    return;
                }

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    });
}

module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySection =function(req,res){
    //passport js inbuild function
    req.logout(function(err){
        if(err){
            console.log(err);
            return res.redirect('back');
        }
        return res.redirect('/');
    });
}