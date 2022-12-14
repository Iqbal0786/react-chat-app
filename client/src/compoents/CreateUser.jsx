import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Modal, Form } from "react-bootstrap";
import { useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
let socket;

export default function CreateUser({ show, modalCloseHanlder }) {
  //   const [show, setShow] = useState(false);
  const ENDPOINT = "https://react-chat-app-db.herokuapp.com/";
  const [rooms, setRooms] = useState([]);
  const [userInput, setUserInput] = useState({
    user_id: "",
    userName: "",
    roomName: "",
  });
  const handleClose = () => {
    modalCloseHanlder();
    setUserInput({
      user_id: "",
      userName: "",
      roomName: "",
    });
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, user_id: socket.id, [name]: value });
  };
  const createAccountHandler = (e) => {
    e.preventDefault();
    if (userInput.name == "" || userInput.roomName == "") {
      alert("Please filled details !!");
      return;
    }
    axios
      .post("https://react-chat-app-db.herokuapp.com/chats", userInput)
      .then((res) => {
        console.log("result from axios", res);
        if (res.status == 201) {
          alert("Account created Successfully !!");
        } else {
          alert(res.data.message);
        }
      });
    modalCloseHanlder();
  };
  console.log(userInput);

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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Account </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form style={{ width: "70%", marginLeft: "50px", marginTop: "10px" }}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Your Name </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username ..."
                onChange={inputHandler}
                name="userName"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Room</Form.Label>
              <Form.Select onChange={inputHandler} name="roomName">
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createAccountHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
