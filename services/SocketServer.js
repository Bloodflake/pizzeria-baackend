
const { Server } = require("socket.io");
let io;

export function initSocket(server){
    io = new Server(server);
    io.on("connection", (socket)=>{
        console.log("connection to socket from service", socket.id);
    })
      
      
    io.on("disconnect", (socket)=>{
    console.log("diconnect to socket", socket.id);
    })
}

export function getSocketIo(){
    return io;
}