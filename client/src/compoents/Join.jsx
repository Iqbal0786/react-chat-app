import React from 'react'
import {Button, Card ,Form} from "react-bootstrap"

export default function Join() {
  return (
    <>
    <Card  style={{width:"500px" , height:"300px" , margin:"auto", marginTop:"5%"}}>
     <Card Hearder as={"h5"} style={{textAlign:"center" , color:"#3da13c"}}>Let's Talk </Card>
     <Form style={{width:"70%" , marginLeft:"50px" ,marginTop:"10px"}}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Your Name </Form.Label>
        <Form.Control type="email" placeholder="Enter your name ..." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Room</Form.Label>
        <Form.Control type="email" placeholder="Enter room name to join ..." />
      </Form.Group>
      <Button>Join Room </Button>
    </Form>
      
    </Card>
    
    </>
  )
}
