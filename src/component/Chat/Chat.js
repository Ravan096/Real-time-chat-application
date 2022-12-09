import React, { useEffect, useState } from "react";
import { user } from "../Join/Join.js";
import socketIO from "socket.io-client";
import "../Chat/Chat.css";
import sendbtn from "../../Images/sendbtn.png";
import { Message } from "../Message/Message.js";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeicon from "../../Images/close.png";

let socket;
const ENDPOINT = "http://localhost:4500";


const Chat = () => {
  const [id, setid] = useState("");
  const [messages, setMessages] = useState([])
  
  const send = () => {
    const message = document.getElementById("chatinput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatinput").value = "";
  }

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      alert("connected");
      setid(socket.id);
    })

    console.log(socket);

    socket.emit("Joined", { user }) // emit means sending data

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    })

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    })

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(user.data, data.message);
    })

    return () => {
      // socket.emit("disconnect");
      socket.disconnect();
      socket.off();
    }// eslint-disable-next-line
  }, [])

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    })

    return () => {
      socket.off();
    }
  }, [messages]);

  return (
    <div className="Chatpage">
      <div className="Chatcontainer">
        <div className="Header">
          <h2>Mongo Chat</h2>
          <a href="/"><img src={closeicon} alt="Close" /></a>
        </div>
        <ReactScrollToBottom className="Chatbox">
          {messages.map((item, i) => <Message user={item.id === id ? "" : item.user} message={item.message} classs={item.id === id ? "right" : "left"}key={i}/>)}
        </ReactScrollToBottom>
        <div className="Inputbox">
          <input onKeyPress={(e)=>e.key==="Enter"? send():null} type="text" id="chatinput" placeholder="Type Here" />
          <button onClick={send} className="sendbtn">
            <img src={sendbtn} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  )
}

export { Chat };
