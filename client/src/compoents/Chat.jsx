import React from "react";
import { useEffect } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { Stack, Container, Form, Button, Card } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";
import io from "socket.io-client";
import { useState } from "react";
import MessageText from "./MessageText";
let socket;
export default function Chat() {
  const { search } = useLocation();
  const { name, room } = queryString.parse(search);
  const [roomData, setRoomData] = useState([]);
  const [inputMessage,setInputMessage]=useState("");
  const [chatId,setChatId]=useState("")
  const ENDPOINT = "localhost:5000";

  const sendMessage=(e)=>{
    e.preventDefault();
    socket.emit("sendMessage" ,{
     body:inputMessage,
     chat_id:chatId
    });

    socket.on("updatedRoomsData",(data)=>{
      console.log(' new data after sending messages',data);
      setRoomData(data)
    })
    
}
  // console.log(name, room);
  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"] });
    console.log(socket);
    socket.emit("join", { name, room });
    socket.on("roomsData", (data) => {
      setRoomData(data);
      let [chat_id]= data.filter((user)=>{
          if(user.chat_id.userName==name){
            return user.chat_id
          }
      })
       setChatId(chat_id.chat_id._id)
      console.log(data);
    });

    return () => {
      // socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, search ]);

  // useEffect(()=>{
  //   socket.on("roomsData", (data) => {
  //     setRoomData(data);
  //   });
  // },[sendMessage])
 //console.log(chatId)
  return (
    <Container className="mt-5">
      <Stack gap={3}>
        <div className="bg-light border" style={{ textAlign: "center" }}>
          Welcome to CodingMeme{" "}
        </div>
        <Card style={{ width: "100%", height: "450px", padding: "15px"  , overflow:"auto"}}>
          {
            roomData.map((msg)=>{
              let currentUser=msg.chat_id.userName===name
               return (
                  
               <MessageText msg={msg} currentUser={currentUser}/>
                   
               )
            })
          }
        </Card>
        <Stack direction="horizontal" gap={3}>
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="type messages....."
            onChange={(e)=>{
              setInputMessage(e.target.value)
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
  );
}
