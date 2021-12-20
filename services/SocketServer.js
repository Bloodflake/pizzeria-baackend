
const { Server } = require("socket.io");
let io;

export function initSocket(server){
    io = new Server(server, {
        cors: {
          origin: '*',
        }
      });
    io.on("connection", (socket)=>{
        // console.log("connection to socket", socket.id);

        socket.on("join", (roomName)=>{
            // console.log("connection to room ", roomName)
            socket.join(roomName);
        });

        socket.on("disconnect", ()=>{
            // console.log("diconnect to socket");
        });

        socket.on("adminJoin", (roomName)=>{
            // console.log("connection to room ", roomName)
            socket.join(roomName);
        });

        
    })
    
}

export function getSocketIo(){
    return io;
}