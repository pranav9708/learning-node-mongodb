module.exports.home = function(req,res){
    console.log(req.cookies)
    res.cookie('user_id',25);

    return res.render('home',{
        title : "Home"
    });
}

// module.exports.profile = function(req,res){
//     return res.end('<h1>You are now in profile page!</h1>');
// }