import React from 'react'
import { useEffect } from 'react'
import queryString from "query-string"
import { useLocation } from 'react-router-dom'
export default function Chat({location}) {
    const {search} =useLocation();
    const {name,room} = queryString.parse(search);
    console.log(name,room);
    useEffect(()=>{
   
        
    },[])
  return (
    <div>Chat</div>
  )
}
