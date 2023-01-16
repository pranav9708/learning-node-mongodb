{
    //method to submit the form data for new post using Ajax
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost=newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                }, error: function (err) {
                    console.log('Error', err.responseText);
                }
            })
        });
    }

    //method to create a post in Dom
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
                    <p>
                            <small>
                                <!-- class is added so that we can add common styling and add clicklistener -->
                                <a class="delete-post-button" href="/posts/destroy/${post.id}">X</a>
                                <br>
                            </small>
                                ${post.content}
                                    <br>
                                    <small>
                                        ${post.user.name}
                                    </small>
                    </p>
                    <div class="post-comments">
                            <form action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type here to add comment" required>
                                <input type="hidden" name="post" value=" ${post._id}">
                                <input type="submit" value="Add comment">
                            </form>

                                <div class="post-comments-list">
                                    <ul id="post-comments-${post._id}">
                                
                                    </ul>
                                </div>
                    </div>
                </li>`
        )}

    createPost();

}