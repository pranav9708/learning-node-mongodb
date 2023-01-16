{
    //method to submit the form data for new post using Ajax
   let createPost=function(){
    let newPostForm = $('#new-post-form');
    newPostForm.submit(function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url: '/posts/create',
            data: newPostForm.serialize(),
            success:function(data){
                console.log(data);
            },error: function(err){
                console.log('Error',err.responseText);
            }
        })
    });
   }

   //method to create a post in Dom


   createPost();

}