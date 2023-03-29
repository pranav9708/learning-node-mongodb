//console.log('jsfile')
{
    let makeFriend=function(){
        let toggle=$('#friend-link');
        toggleFriend.click(function(e){
            e.preventDefault();
            $.ajax({
                type:'POST',
                url: $(toggleFriend).attr('href'),
            }).done(function(data){
                if(data.data.deleted==false)red();
                else green();
            }).fail(function(err){
                console.log('error in completing the request');
            })
        })
    }

    let green=function(){
        let toggleFriend = document.getElementById('toggle-friend');
        console.log(toggleFriend);
        toggleFriend.style.backgroundColor='blue';
        toggleFriend.innerText='Add Friend';

    }

    let red = function(){
        // let friendStyle = $('#friend-style')
        let toggleFriend = document.getElementById('toggle-friend');
        //console.log(friendStyle);
        toggleFriend.style.backgroundColor = 'red';
        toggleFriend.innerText = 'Remove Friend';
        toggleFriend.style.color = 'white';
    }
      
    makeFriend();
}