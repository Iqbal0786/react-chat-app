const express= require("express");
const socketio= require("socket.io");
const http= require("http")
const connect= require("./configs/db")
const app = express();
const router= require("./routes/router");
const cors= require("cors");
const  server= http.createServer(app); // createing server
const io= socketio(server);
app.use(router)
app.use(cors())
io.on("connection",(socket)=>{
    console.log("A new user is connected!!");
    socket.on("join",({name,room})=>{
        //console.log(name,room)
    })
    socket.on("disconnect" ,()=>{
        console.log("User had left !!");
    })
})

server.listen(process.env.PORT || 5000, async()=>{
     try {
         await connect()
         console.log("server is live on port 5000");
     } catch (error) {
        console.log(error.message)
     }
})