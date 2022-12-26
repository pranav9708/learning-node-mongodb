module.exports.home = function(req,res){
    console.log(req.cookie)
    return res.render('home',{
        title : "Home"
    });
}

// module.exports.profile = function(req,res){
//     return res.end('<h1>You are now in profile page!</h1>');
// }