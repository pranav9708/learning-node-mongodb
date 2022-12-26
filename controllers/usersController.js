const User=require('../models/User');

module.exports.profile= function(req, res){
    return res.end('<h1>User Profile!</h1>');
}

// module.exports.post= function(req, res){
//     return res.end('<h1>User Posts!</h1>');
// }

module.exports.signIn= function(req, res){
    return res.render('user_sign_in',{
        title:'Codeial | Sign In'
    })
}

module.exports.signUp= function(req, res){
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