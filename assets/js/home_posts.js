{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    // enable the functionality of toggle like button on new post
                    new ToggleLike($('.toggle-like-button', newPost));

                    new Noty({
                        theme:'relax',
                        text:"Post Published!",
                        type:"success",
                        layout: 'topRight',
                        timeout: 1500
                    }).show();

                    
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function(post){
        //show zero count fot new post
        return $(`<li id="post-${post._id}">
                    <p>
                        
                        <small>
                            <a class="delete-post-button"  href="/posts/destroy/${ post._id }">X</a>
                        </small>
                       
                        ${ post.content }
                        <br>
                        <small>
                        ${ post.user.name }
                        </small>
                        <br>
                        <small>
                            <a class="toggle-like-button" data-likes="0" href="/likes/toggles/?id=${ post._id }"&type=Post">
                                0 Likes
                            </a>
                        </small>
                    </p>
                    <div class="post-comments">
                        
                            <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                <input type="hidden" name="post" value="${ post._id }" >
                                <input type="submit" value="Add Comment">
                            </form>
               
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                                
                            </ul>
                        </div>
                    </div>
                    
                </li>`)
    }


    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();

                    new Noty({
                        theme:'relax',
                        text:"Post deleted!",
                        type:'success',
                        layout:'topRight',
                        timeout: 1500
                    }).show();

                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    //loop all over existing posts on page to add delete option dynamically 
    let ConvertToAjax= function(){
        $('#posts-list-container>ul>li').each(function(){
            //self refers li#post-{post_id}
            let self=$(this);
            let deleteButton=$('.delete-post-button',self);
            deletePost(deleteButton);

            //get post id by splitting id attribute, self.prop('id')=post-{post_id}
            let postId=self.prop('id').split('-')[1];
            new PostComments(postId);
        });
    }



    ConvertToAjax();
    createPost();
}