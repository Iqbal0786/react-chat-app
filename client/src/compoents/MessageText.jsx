import React from 'react'
import { Card } from 'react-bootstrap'
export default function MessageText({msg ,currentUser}) {
  let range = {min: 10, max: 20}
   let delta = range.max - range.min

   const rand = Math.round(range.min + Math.random() * delta)
  return (
    <>
     {
        // currentUser?<Card.Text  style={{marginLeft:"auto" ,backgroundColor:"#d9fdd3" , padding:"5px", borderRadius:"0px 20px 0px 20px" , marginBottom:"2px"}}>{msg.body}</Card.Text> :<Card.Text style={{backgroundColor:"gray", marginRight:"auto" , color:"white" , padding:"5px", borderRadius:"0px 20px 0px 20px" , marginBottom:"2px"}}>{msg.body}</Card.Text>
        <>
         <div style={{maxWidth:"15%" , margin:` 20px 0px 10px ${rand}%`  }}>
        <Card.Text style={{backgroundColor:"gray" , color:"white" , padding:"5px", borderRadius:"0px 20px 0px 20px" , marginBottom:"2px"}}>{msg.body}</Card.Text> 
        <span style={{fontWeight:"400" , fontFamily:"mono-space" , color:"#e84c89"}}> by iqbal007</span>
        </div>
        
        </>

     }
    </>
  )
}
