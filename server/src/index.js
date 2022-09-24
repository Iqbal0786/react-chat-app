const express= require("express");
const socketio= require("socket.io");
const http= require("http")
const app = express();
const  server= http.createServer(app); // createing server

server.listen(process.env.PORT || 5000, ()=>{
    console.log("server is live on port 5000");
})