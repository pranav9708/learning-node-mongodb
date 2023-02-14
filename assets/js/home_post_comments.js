class PostComments{
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self=this;
        //adding dynamic delete for existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }

    createComment(postId){
        console.log('inside createComment');
        
        let pSelf=this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            
            let self=this;

            $.ajax({
                type:'POST',
                url:'/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    console.log(pSelf);
                    //creating new DOM for comment
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    //adding new comment to top
                    $(`#post-comments-${postId}`).prepend(newComment);
                    //adding delete functionality
                    pSelf.deleteComment($(' .delete-comment-button',newComment))

                    new Noty({
                        theme:'relax',
                        text:'Comment Published!',
                        type:'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },error:function(err){
                    console.log(error.responseText);
                }
            })
        })
    }

    newCommentDom(comment){
        return $(`<li id="comment-${comment._id}">
                    <p>
                            <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                        ${comment.content}
                            <br>
                            <small>
                                ${comment.user.name}
                            </small>
                    </p>
                </li>`);
    }

    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme:'relax',
                        text:"Comment deleted!",
                        type:'success',
                        layout:'topRight',
                        timeOut: 1500
                    }).show();
                },error: function(err){
                    console.log(err.responseText);
                }
            })
        })
    }
}