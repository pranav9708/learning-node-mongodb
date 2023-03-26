const User = require('../models/user');
const fs=require('fs');
const path=require('path');
const resetEmailWorker = require('../workers/resetPassword_worker');
const Token=require('../models/token');
const queue = require('../config/kue');
const { response } = require('express');

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

                    if(user.avatar){
                        if(fs.existsSync(path.join(__dirname,'..',user.avatar))){
                            fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        }
                    }
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

module.exports.forgotPassword=function(req,res){
    res.render('forgot_password',{
        title:'Reset password'
    });
}

module.exports.resetPassword= async function(req,res){
    let user=await User.findOne({email:req.body.email});

    let token =await Token.create({isValid:true,user:user})
    let job=queue.create('reset',token).save(function(err){
        if(err){
            console.log('error in creating queue',err);
            return;
        }
        console.log('enqueued',job.id);
    });

    res.render('reset_email_sent',{
        title:'Mail Inbox'
    });
}

module.exports.changePassword=async function(req,res){
    let token =await Token.findById(req.params.id);
    if(!token || token.isValid ==false){
        res.render('user_sign_in.ejs',{
            title:'signIn'
        })
        return;
    }else{
        await Token.findByIdAndUpdate(req.params.id,{isValid:false});
        res.render('change_password',{
            title:'changePassword'
        })
    }
}


module.exports.updatePassword = async function (req, res) {
    if(req.body.password != req.body.confirmPassword){
        console.log("password not matching");
        return res.redirect('back');
    }
    let user = await User.findOne({email:req.body.email});
    if(!user){
        res.render('user_sign_up',{
            title:'signUp'
        })
        return;
    }else{
        console.log(user);
        await User.findByIdAndUpdate(user.id,{password:req.body.password});
        console.log("***changed password***");
        res.render('user_sign_in',{
            title:'SignIn'
        })
    }
}