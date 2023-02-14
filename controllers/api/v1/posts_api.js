const Post=require('../../../models/Post');

module.exports.index = async function(req,res){

    let posts= await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate:{
                    path:'user'
                },
                options:{
                    sort:{
                        createdAt: -1
                    }
                }
            });

    return res.status(200).json({
        message: "Lists of posts",
        posts: posts
    })
}