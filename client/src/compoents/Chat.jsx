import React from 'react'
import { useEffect } from 'react'
import queryString from "query-string"
import { useLocation } from 'react-router-dom'
import {Stack , Container ,Form, Button} from "react-bootstrap"
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
    <Container className='mt-5'>

<Stack gap={3}>
    <div className="bg-light border" style={{textAlign:"center"}}>Welcome to  CodingMeme </div>
    <Form.Floating className="mb-3">
        <Form.Control
          id="floatingInputCustom"
          type="text"
          placeholder="messages"
          disabled
          value={"hii am iqbal"}
          style={{height:"400px"}}
        />
      </Form.Floating>
      <Stack direction="horizontal" gap={3}>
      <Form.Control
          id="floatingInputCustom"
          type="text"
          placeholder="type messages....."
        />
        <Button>
          Send
        </Button>
    </Stack>
  </Stack>
    </Container>
  )
}
