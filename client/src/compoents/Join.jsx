import React from 'react'
import { useState } from 'react'
import {Button, Card ,Form} from "react-bootstrap"
import { Link } from 'react-router-dom';
import CreateUser from './CreateUser';

export default function Join() {
    const [name,setName]=useState('');
    const [room,setRoom]=useState("");
    const [show,setShow]=useState(false);
    const modalHandler = ()=>{
        setShow(true)
    }
    const modalCloseHanlder=()=>{
       setShow(false)
    }
  return (
    <>
    <Card  style={{width:"500px" , height:"300px" , margin:"auto", marginTop:"5%"}}>
     <Card Hearder as={"h5"} style={{textAlign:"center" , color:"#3da13c"}}>Let's Talk </Card>
     <Form style={{width:"70%" , marginLeft:"50px" ,marginTop:"10px"}}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Your Name </Form.Label>
        <Form.Control type="email" placeholder="Enter your name ..." onChange={(e)=>{
            setName(e.target.value)
        }} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Room</Form.Label>
        <Form.Control type="email" placeholder="Enter room name to join ..."  onChange={(e)=>{
            setRoom(e.target.value)
        }}/>
      </Form.Group>
      <Link onClick={(e)=>!name || !room?e.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>
      <Button type='submit'>Join Room </Button>
      </Link>
      <Button style={{marginLeft:"10px"}} onClick={modalHandler}>Create Account </Button>
    </Form>
      
    </Card>
    <CreateUser show={show} modalCloseHanlder={modalCloseHanlder}/>
    </>
  )
}
