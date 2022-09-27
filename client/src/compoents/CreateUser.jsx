import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Modal, Form } from "react-bootstrap";

export default function CreateUser({ show, modalCloseHanlder }) {
  //   const [show, setShow] = useState(false);
  const handleClose = () => {
    modalCloseHanlder();
  };

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
                type="email"
                placeholder="Enter your name ..."
                onChange={(e) => {}}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Room</Form.Label>
                <Form.Select>
                    <option value="">CodingMeme</option>
                    <option value="">CodingMeme</option>
                    <option value="">CodingMeme</option>
                </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
