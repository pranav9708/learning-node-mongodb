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
            console.log('socket disconnected')
        })
    })


}