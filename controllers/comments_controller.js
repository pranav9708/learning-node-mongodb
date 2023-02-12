const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);

        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            });
            //just in memory
            post.comments.push(comment);
            //save changes to databse
            post.save();


            if(req.xhr){
                comment = await comment.populate('user','name');

                return res.status(200).json({
                    data:{
                        comment: comment
                    },
                    message:'comment created!'
                });
            }
            req.flash('success','comment created Successfully');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error',err);
        return;
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id) {
            let postId = comment.post;

            comment.remove();
            //finding comment with id=req.params.id in post collection 
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })


            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment_id:req.params.id
                    },
                    message: 'Comment deleted successfully'
                })
            }
            req.flash('success','comment deleted Successfully!');
            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error',err);
        return;
    }
}