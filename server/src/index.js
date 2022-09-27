const express= require("express");
const socketio= require("socket.io");
const http= require("http")
const connect= require("./configs/db")
const app = express();
const router= require("./routes/router");
const Message= require("./models/message.model");
const Room= require("./models/room.model");
const Chat= require("./models/chat.model")
const cors= require("cors");
const  server= http.createServer(app); // createing server
const io= socketio(server);
app.use(cors())
app.use(express.json());

app.use(router)


io.on("connection",(socket)=>{
    console.log("A new user is connected!!");
 
    socket.on("join",({name,room})=>{
        //console.log(name,room)
        Message.find().populate({path:"chat_id", select:["userName","roomName","user_id"]}).lean().exec().then((res)=>{
            io.emit("roomsData", res.filter(item=> item.chat_id.roomName===room))
        }).catch((err)=>{
            console.log(err.message);
        })
    });
    socket.on("sendMessage",(message)=>{
        const msg= new Message(message);
         msg.save().then(()=>{
            console.log("new message added");
            Message.find().populate({path:"chat_id", select:["userName","roomName","user_id"]}).lean().exec().then((res)=>{
                io.emit("updatedRoomsData", res)
            })
         })
    })

         // fetching rooms data and sending it back 
         Room.find().then((res)=>{
              io.emit("getRooms" , res);
         }).catch((err)=>{
            console.log(err.message)
         })

         // creating new user 
         socket.on("createUser",(user)=>{
            const new_user= new Chat(user);
              new_user.save().then((res)=>{
                console.log("new account is created");
              }).catch((err)=>{
                 console.log(err.message);
              })
         })

         // finding chat_id by name and sending it to client
        socket.on("getChatId" ,(name)=>{
            Chat.find({name}).then((res)=>{
                io.emit("chatId" , res._id)
            }).catch((err)=>{
                console.log(err.message);
            })
        })

   
    socket.on("disconnect" ,()=>{
        console.log("User had left !!");
    })
})

 connect().then((res)=>{
    console.log("database is connected")
 }).catch((err)=>{
    console.log("Something went wrong while connecting with database")
 })
server.listen(process.env.PORT || 5000, async()=>{
     try {
        //  await connect()
         console.log("server is live on port 5000");
     } catch (error) {
        console.log(error.message)
     }
})