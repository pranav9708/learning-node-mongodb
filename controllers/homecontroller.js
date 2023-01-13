const Post= require('../models/Post');
const User= require('../models/User');

module.exports.home = async function(req,res){

    try{
        //populate each user of post(add more info to user variable other than id)
    let posts= await Post.find({})
    .populate('user')
    //path is used for populating from multiple models
    .populate({
        path: 'comments',
        populate:{
            path:'user'
        }
    });

    let users=await  User.find({})
    
    return res.render('home', {
        title: "Codeial",
        posts:  posts,
        all_users: users
    });
    }catch(err){
       console.log('Error',err);
       return;
    }
    
}