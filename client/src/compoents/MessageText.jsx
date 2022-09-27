import React from 'react'
import { Card } from 'react-bootstrap'
export default function MessageText({msg ,currentUser}) {
  return (
    <>
     {
        // currentUser?<Card.Text  style={{marginLeft:"auto" ,backgroundColor:"#d9fdd3" , padding:"5px", borderRadius:"0px 20px 0px 20px" , marginBottom:"2px"}}>{msg.body}</Card.Text> :<Card.Text style={{backgroundColor:"gray", marginRight:"auto" , color:"white" , padding:"5px", borderRadius:"0px 20px 0px 20px" , marginBottom:"2px"}}>{msg.body}</Card.Text>

        <Card.Text style={{backgroundColor:"gray", marginRight:"auto" , color:"white" , padding:"5px", borderRadius:"0px 20px 0px 20px" , marginBottom:"2px"}}>{msg.body}</Card.Text>
     }
    </>
  )
}
