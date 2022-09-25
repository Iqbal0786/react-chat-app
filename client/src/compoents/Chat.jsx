import React from 'react'
import { useEffect } from 'react'
import queryString from "query-string"
import { useLocation } from 'react-router-dom'
import io from "socket.io-client";
let socket;
export default function Chat() {
    const {search} =useLocation();
    const {name,room} = queryString.parse(search);
    const ENDPOINT='localhost:5000'
    console.log(name,room);
    useEffect(()=>{
      socket= io(ENDPOINT,{ transports : ['websocket'] });
      console.log(socket)
      socket.emit("join",{name,room})
      socket.on("roomsData" , (data)=>{
        console.log(data)
      })

      return ()=>{
        // socket.emit("disconnect");
        socket.off()
      }
    },[ENDPOINT,search]);

  return (
    <div>Chat</div>
  )
}
