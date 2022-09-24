const express= require("express");
const socketio= require("socket.io");
const http= require("http")
const app = express();
const router= require("./routes/router")
const  server= http.createServer(app); // createing server

app.use(router)

server.listen(process.env.PORT || 5000, ()=>{
    console.log("server is live on port 5000");
})