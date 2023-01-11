const Comment = require('../models/comment');
const Post = require('../models/Post');
module.exports.create= function(req,res){
    Post.findById(req.body.post, function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                post: req.body.post,
                user:req.user._id
            }, function(err,comment){
                //handle error
                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }
    });
}

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user== req.user.id){
            //before removing comment the same comment should be deleted from comment array in post
            let postId=comment.post;
            comment.remove();

            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            })
        }else{
            //throw error tat user is not authorized to delete
            return res.redirect('back');
        }
    })
}