const User = require('../models/user');


module.exports.profile = function(req, res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user
        })
    })
}


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error','passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            req.flash('error',err);
            return;
        }

        if (!user){
            User.create(req.body, function(err, user){
                if(err){
                    req.flash('error',err);
                    return
                }
                return res.redirect('/users/sign-in');
            })
        }else{
            
            req.flash('success','Sign up complete please sign in to continue');
            return res.redirect('/');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){
            console.log(err);
            req.flash('error', 'Error while logging out');
            return res.redirect('back');
        }
        req.flash('success', 'Logged out successfully');
        return res.redirect('/');
    });
}

module.exports.update= async function(req, res){
    
    if(req.user.id==req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('****multerError****',err)
                }
                user.name=req.body.name;
                user.email=req.body.email;

                if(req.file){
                    //this is saving the path of thee uploaded ile into the avatar field in the user
                    user.avatar= User.avatarPath + '/' +req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }
    }else{
        req.flash('error','unauthorized');
        return res.status(401).send('Unauthorized')
    }
}