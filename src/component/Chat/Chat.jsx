import React, { useContext ,useEffect, useState } from "react";
import Message from "../Message/Message";
import socketIo from "socket.io-client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import NameContext from '../NameContext'; // Adjust the path as per your project structure
import ReactScrollToBottom from 'react-scroll-to-bottom';
const ENDPOINT = "http://localhost:5000/";

let socket;

function Chat() {
  const [id, setId]= useState('')
  const [message, setMessage] = useState("");
  const { userName } = useContext(NameContext);
  const [messages, setMessages]= useState([])

  useEffect(() => {
    
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      alert("Connected");
      setId(socket.id);
      console.log("Socket Connected");
    });

    socket.emit("joined",{userName})

    socket.on("welcome", (data)=>{
      setMessages([...messages, data])
      console.log(data)
    })

    socket.on("userJoined", (data)=>{
      setMessages([...messages, data])

      console.log(data);
    })

    socket.on('leave', (data)=>{
      setMessages([...messages, data])

      console.log(data);

    })

    return ()=>{
      socket.emit("disconnect");
      socket.off();
    }

  }, []);

  useEffect(()=>{
    socket.on("inGroup",(data) =>{
      setMessages([...messages, data])
      console.log(data);
    })

    return ()=>{
      socket.off();
    }

  },[messages]);

  const handleSend = (e) => {
    e.preventDefault();
    debugger
    console.log(message);

    socket.emit("sendInGroup", {message, id})

    setMessage("");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: 'space-evenly',
            p: 1,
            border: "1px solid black",
            width: "420px",
            backgroundColor: "rgb(34,193,195)",
            textAlign: "center",
            height: "420px",
          }}
        >
          <Box
            component="div"
            sx={{
              backgroundColor: "yellow",
              height: "35px",
            }}
          >
            <Typography>User Name: {userName}</Typography>
          </Box>

          <Box component="ReactScrollToBottom"
            sx={{
              border: "1px solid black",
              backgroundColor: "white",
              height: "200px",
              p:"2px",
              overflowY:"auto",
            }}
          >
            {
              messages && messages.map((item, index)=>(
                <Message user={item.id === id ? '' : item.user} sendMessage={item.message} classes={item.id === id ?  'right' : 'left'   }/>
              ))
            }
          </Box>

          <Box component="div" 
          sx={{
            alignItems: 'flex-start',
          }}
          >
            <TextField
              label="Your Name"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variant="outlined"
            />
            <Button variant="contained" onClick={handleSend}>
              Send
            </Button>
          </Box>
        </Box>
      </div>
    </div>

  );
}

export default Chat;
