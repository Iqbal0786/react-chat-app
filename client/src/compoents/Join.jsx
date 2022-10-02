import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import CreateUser from "./CreateUser";
import "../index.css"
let socket;
export default function Join() {
  const ENDPOINT = "https://react-chat-app-db.herokuapp.com/";
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState("");
  const [show, setShow] = useState(false);
  const modalHandler = () => {
    setShow(true);
  };
  const modalCloseHanlder = () => {
    setShow(false);
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("getRooms", (roomData) => {
      //  console.log(rooms)
      setRooms([...roomData]);
    });
    console.log(socket);

    return () => {
      // socket.emit("disconnect");
      socket.off();
    };
  }, []);
  return (
    <>
      <Card
        style={{
          width: "500px",
          height: "300px",
          margin: "auto",
          marginTop: "5%",
        }}
        className="join-bg"
      >
        <Card
          Hearder
          as={"h5"}
          style={{ textAlign: "center", color: "#3da13c" , backgroundColor:"transparent" ,marginTop:"5px" }}
        >
          Let's Talk{" "}
        </Card>
        <Form style={{ width: "70%", marginLeft: "50px", marginTop: "10px" }}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Your Name </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your name ..."
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Room</Form.Label>
            <Form.Select
              onChange={(e) => {
                setRoom(e.target.value);
              }}
              name="roomName"
            >
              <option>Choose room</option>
              {rooms.length ? (
                rooms.map((e) => {
                  return <option key={e._id}>{e.roomTitle}</option>;
                })
              ) : (
                <option>choose</option>
              )}
            </Form.Select>
          </Form.Group>
          <Link
            onClick={(e) => (!name || !room ? e.preventDefault() : null)}
            to={`/chat?name=${name}&room=${room}`}
          >
            <Button type="submit">Join Room </Button>
          </Link>
          <Button style={{ marginLeft: "10px" }} onClick={modalHandler}>
            Create Account{" "}
          </Button>
        </Form>
      </Card>
      <CreateUser show={show} modalCloseHanlder={modalCloseHanlder} />
    </>
  );
}
