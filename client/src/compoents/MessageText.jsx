import React from "react";
import { Card } from "react-bootstrap";

export default function MessageText({ msg, currentUser, chatInfo }) {
  let range = { min: 10, max: 20 };
  let delta = range.max - range.min;
  
  const rand = Math.round(range.min + Math.random() * delta);
  return (

    <>
      {
        <>
    
          <div style={{ maxWidth: "20%", margin: ` 20px 0px 10px 40px` }}>
            <Card.Text
              style={{
                backgroundColor: "#4285f4",
                color: "white",
                padding: "5px",
                borderRadius: "0px 20px 0px 20px",
                marginBottom: "2px",
              }}
            >
              {msg.body}
            </Card.Text>
            <span
              style={{
                fontWeight: "500",
                fontFamily: "mono-space",
                color: "#ffff00",
              }}
            >
              {" "}
              by {currentUser}
            </span>{" "}
            <span
              style={{
                fontWeight: "400",
                fontFamily: "mono-space",
                color: "#ff9f00",
                fontSize: "14px",
                marginLeft: "5px",
              }}
            >
              {" "}
              {`${chatInfo.messageDay}  ${chatInfo.messageTime}   ${chatInfo.messageDate}`}
            </span>
          </div>
      
        </>
      }
    </>
  );
}
