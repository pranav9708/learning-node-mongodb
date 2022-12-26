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