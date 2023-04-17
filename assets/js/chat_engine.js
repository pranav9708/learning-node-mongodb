//subscriber in socket system

class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;
        
        this.socket=io.connect('http://localhost:5000');
        if(this.userEmail){
            this.connectionHandler();
        }
    }


    connectionHandler(){

        let self=this;

        this.socket.on('connect',function(){
            console.log('connection established using sockets..!');
            
            //send request to join room
            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatRoom:'codeial'
            });

            self.socket.on('user_joined',function(data){
                console.log('a new user joined',data);
            })

        });

        //send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg=$('#chat-message-input').val();

            if(msg!=''){
                self.socket.emit('sendMessage',{
                    message:msg,
                    user_email:self.userEmail,
                    chatRoom:'codeial'
                });
            }
        })

    }
}