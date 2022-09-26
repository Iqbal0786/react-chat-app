import React from "react";
import { useEffect } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { Stack, Container, Form, Button, Card } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";
import io from "socket.io-client";
import { useState } from "react";
let socket;
export default function Chat() {
  const { search } = useLocation();
  const { name, room } = queryString.parse(search);
  const [roomData, setRoomData] = useState([]);
  const ENDPOINT = "localhost:5000";
  console.log(name, room);
  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"] });
    console.log(socket);
    socket.emit("join", { name, room });
    socket.on("roomsData", (data) => {
      setRoomData(data);
      console.log(data);
    });

    return () => {
      // socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, search]);

  return (
    <Container className="mt-5">
      <Stack gap={3}>
        <div className="bg-light border" style={{ textAlign: "center" }}>
          Welcome to CodingMeme{" "}
        </div>
        <Card style={{ width: "100%", height: "450px", padding: "15px" }}>
          {
            roomData.map((msg)=>{
              return (
                <Card.Text style={{ marginLeft: "auto" }}>{msg.body}</Card.Text>
              )
            })
          }
        </Card>
        <Stack direction="horizontal" gap={3}>
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="type messages....."
          />
          <Button style={{ width: "100px", padding: "5px" }}>
            Send
            <FaPaperPlane style={{ marginLeft: "5px" }} />
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
