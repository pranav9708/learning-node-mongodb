//observer in socket system

module.exports.chatSockets=function(socketServer){
    //io will be handling the connections
    let io=require('socket.io')(socketServer,{
        cors:{
            origin: '*'
        }
    });
    
    io.sockets.on('connection', function(socket){
        console.log('new connection received',socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected');
        })

        //receiving request
        socket.on('join_room',function(data){
            console.log('joining request received',data);

            //if chatroom already exits user will enter tat chatroom
            socket.join(data.chatRoom);

            //emit user has entered to everyone else in chatRoom
            io.in(data.chatRoom).emit('user_joined',data);
        })

        socket.on('send_message', function(data) {
            io.in(data.chatRoom).emit('receive_message',data);
        });

    })


}