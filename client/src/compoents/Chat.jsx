import React from "react";
import { useEffect } from "react";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { Stack, Container, Form, Button, Card } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";
import io from "socket.io-client";
import { useState } from "react";
import MessageText from "./MessageText";
import ScrollToBottom from "react-scroll-to-bottom";
import {css} from "@emotion/css"
import axios from "axios";
let socket;
export default function Chat() {
  const { search } = useLocation();
  const { name, room } = queryString.parse(search);
  const [roomData, setRoomData] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatId, setChatId] = useState("");
  const ENDPOINT = "https://react-chat-app-db.herokuapp.com/";
  const navigate = useNavigate();
  const ROOT_CSS = css({
    height: "100%",
    width: "100%",
  })
  const sendMessage = (e) => {
    e.preventDefault();
    const chatBody = {
      body: inputMessage,
      chat_id: chatId,
      room,
    };
    console.log("sender chat body", chatBody);
    socket.emit("sendMessage", chatBody);

    socket.on("updatedRoomsData", (data) => {
      console.log(" new data after sending messages", data);

      setRoomData(data);
      setInputMessage("");
    });
  };
  // console.log(name, room);
  useEffect(() => {
    socket = io(ENDPOINT);
    // console.log(socket.connected);
    socket.emit("join", { name, room });
    socket.on("roomsData", (data) => {
      setRoomData(data);
      // console.log(data);
    });

    return () => {
      // socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, name]);

  useEffect(() => {
    axios
      .get(`https://react-chat-app-db.herokuapp.com/chats/${name}`)
      .then((res) => {
        if (!res.data._id) {
          navigate("/");
        }
        setChatId(res.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [name]);
  // console.log(`chat id of user ${name} is ${chatId}`)
  return (
    <>
      {
        <Container className="mt-5">
          <Stack gap={2}>
            <div
              className=" border"
              style={{
                textAlign: "center",
                backgroundColor: "#1eb282",
                height: "40px",
                padding: "5px",
                color: "white",
                fontSize: "20px",
                fontFamily: "mono-space",
              }}
            >
              Welcome to {room} 😎🎉🎊🧨
            </div>
   
            <Card
              style={{
                width: "100%",
                height: "450px",
                padding: "15px",
                // overflow: "auto",
                backgroundColor: "#08345b",
              }}
            >
              <ScrollToBottom className={ROOT_CSS}>
              {roomData.length == 0 && (
                <Card.Text style={{color:"white"}}>could not found chat messages ???</Card.Text>
              )}
              {roomData.map((msg) => {
                const currentUser =
                  msg.chat_id.userName === name ? "You" : msg.chat_id.userName;
                // console.log(msg.chat_id.userName);
                let date = new Date(`${msg.createdAt}`);
                let messageDay = date.toString().split(" ")[0];
                let messageTime = date.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                let messageDate = date.toLocaleDateString("en-GB");

                return (
                  <MessageText
                    msg={msg}
                    currentUser={currentUser}
                    chatInfo={{ messageDate, messageTime, messageDay }}
                    key={msg._id}
                  />
                );
              })}
              </ScrollToBottom>
            </Card>
            <Stack direction="horizontal" gap={3}>
              <Form.Control
                id="floatingInputCustom"
                type="text"
                placeholder="type messages....."
                value={inputMessage}
                onChange={(e) => {
                  setInputMessage(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    sendMessage(e);
                  }
                }}
              />
              <Button
                style={{ width: "100px", padding: "5px" }}
                onClick={sendMessage}
              >
                Send
                <FaPaperPlane style={{ marginLeft: "5px" }} />
              </Button>
            </Stack>
          </Stack>
        </Container>
      }
    </>
  );
}
