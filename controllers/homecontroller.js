const Post= require('../models/Post');

module.exports.home = function(req,res){
    // console.log(req.cookies)
    // res.cookie('user_id',25);
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title : "Codeial | Home",
    //         posts: posts
    //     });
    // })

    //populate each user of post(add more info to user variable other than id)
    Post.find({})
    .populate('user')
    //path is used for populating from multiple models
    .populate({
        path: 'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err, posts){
        return res.render('home', {
            title: "Codeial",
            posts:  posts
        });
    })
}

// module.exports.profile = function(req,res){
//     return res.end('<h1>You are now in profile page!</h1>');
// }