
const { Server } = require("socket.io");
let io;

export function initSocket(server){
    io = new Server(server);
    io.on("connection", (socket)=>{
        console.log("connection to socket from orderController", socket.id);

        socket.on("join", (roomName)=>{
            console.log("connection to room ", roomName)
            socket.join(roomName);
        });

        socket.on("disconnect", ()=>{
            console.log("diconnect to socket");
        });
    })
    
}

export function getSocketIo(){
    return io;
}