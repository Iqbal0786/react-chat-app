import React from "react";
import { useEffect } from "react";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { Stack, Container, Form, Button, Card } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";
import io from "socket.io-client";
import { useState } from "react";
import MessageText from "./MessageText";
import ScrollToBottom from "react-scroll-to-bottom"
let socket;
export default function Chat() {
  const { search } = useLocation();
  const { name, room } = queryString.parse(search);
  const [roomData, setRoomData] = useState([]);
  const [inputMessage,setInputMessage]=useState("");
  const [chatId,setChatId]=useState("")
  const ENDPOINT = "https://react-chat-app-db.herokuapp.com/";
  const  navigate=useNavigate()

  const sendMessage=(e)=>{
    e.preventDefault();
 
   
    socket.emit("sendMessage" ,{
     body:inputMessage,
     chat_id:chatId,
     room
    });

    socket.on("updatedRoomsData",(data)=>{
      console.log(' new data after sending messages',data);
       
      setRoomData(data);
      setInputMessage("")
     
    })
   
    
    
}
  // console.log(name, room);
  useEffect(() => {
    socket = io(ENDPOINT);
    console.log(socket);
    socket.emit("join", { name, room });
    socket.on("roomsData", (data) => {
      // if(data.length==0){
      //    setTimeout(() => {
      //     alert("Room or userName not found");
      //     navigate('/')
      //     return
      //    }, 2000);
        
      // }
      setRoomData(data);
      console.log(data);
    });

    return () => {
      // socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, name ]);

  useEffect(()=>{
    // emitting getChatId event
    socket.emit("getChatId" , name);
    //getting chatId 
    socket.on("UserId",(chatId)=>{
      setChatId(chatId)
      // console.log("chat id from db" , chatId)
    })
  },[])
  // console.log('state chat id',chatId)
  return (
    
  <>
    <Container className="mt-5">
      <Stack gap={2}>
        <div className=" border" style={{ textAlign: "center" ,backgroundColor:"#1eb282" , height:"40px" , padding:"5px"  , color:"white" , fontSize:"20px" , fontFamily:"mono-space"}}>
          Welcome to {room} 😎🎉🎊🧨
        </div>
        <Card style={{ width: "100%", height: "450px", padding: "15px",overflow:"auto" , backgroundColor:"#08345b"}}>
          
          { roomData.length==0 && <Card.Text>could not found chat messages ???</Card.Text>}
          {
            roomData.map((msg)=>{
              let currentUser=msg.chat_id.userName===name
               return (
                  
               <MessageText msg={msg} currentUser={currentUser} key={msg._id}/>
               
                   
               )
            })
          }
   
        </Card>
        <Stack direction="horizontal" gap={3}>
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="type messages....."
            value={inputMessage}
            onChange={(e)=>{
              setInputMessage(e.target.value)
            }}
            onKeyPress={(e)=>{
              if(e.key==="Enter"){
                sendMessage(e)
              }
             }}
            
          />
          <Button style={{ width: "100px", padding: "5px" }}
           onClick={sendMessage}
          >
            Send
            <FaPaperPlane style={{ marginLeft: "5px" }} />
          </Button>
        </Stack>
      </Stack>
    </Container> 
   
  </>
  );
}
