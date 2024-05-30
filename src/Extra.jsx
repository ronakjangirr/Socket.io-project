import "./App.css";
import React, { useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import { io } from "socket.io-client"; // Importing io from socket.io-client
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

function Extra() {
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );

  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [group, setGroup] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger;
    console.log(message);

    // socket.emit("chat", message);
    socket.emit("chat", { message, room }); // To send particular user or like personal chat.

    setMessage("");
  };

  console.log("allMessages", allMessages);

  const handleJoin = (e) => {
    e.preventDefault();
    debugger;
    socket.emit("group-join", group); // To send particular user or like personal chat.
    setGroup("");
  };

  useEffect(() => {
    // In Socket.IO, the connect event is a reserved event that is automatically emitted by the client socket when it successfully establishes a connection to the server. There's no need to listen for this event explicitly, as it's emitted by the Socket.IO client library internally.
    // In Socket.IO, the connect event is automatically emitted by the client socket when it successfully establishes a connection to the server. Similarly, on the server side, you can listen for the connection event, which is emitted by the server socket when a client successfully connects.
    socket.on("connect", () => {
      setId(socket.id);
      console.log("connected", socket.id);
    });

    // Listen for chat messages
    // Example - 3
    // socket.on("receive-chat", (data)=>{
    //   debugger
    //   setAllMessages((allMessages) => [...allMessages, data.message]); // Update chatMessages state with new message

    //   console.log("message-",message);
    // })

    // Example - 4 (For Joining group and send message inside the group)
    socket.on("receive-chat", (data) => {
      debugger;
      setAllMessages((allMessages) => [...allMessages, data]); // Update chatMessages state with new message

      console.log("message-", message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            height: "70vh",
            border: "1px solid black",
            marginTop: "50px",
          }}
        >
          <div style={{ overflowY: "scroll", height: "100%" }}>
            {allMessages.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </div>
          <Typography>User Id: {id}</Typography>
          <form style={{ marginTop: "30px" }} onSubmit={handleJoin}>
            <TextField
              id="outlined-basic"
              label="Group"
              variant="outlined"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            />
            <Box sx={{ marginTop: "30px" }}>
              <Button variant="contained" type="submit">
                Join
              </Button>
            </Box>
          </form>
          <form style={{ marginTop: "30px" }} onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Message"
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Room"
              variant="outlined"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />

            <Box sx={{ marginTop: "30px" }}>
              <Button variant="contained" type="submit">
                Send
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default Extra;
