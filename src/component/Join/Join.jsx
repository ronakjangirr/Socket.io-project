import React, { useContext ,useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import NameContext from '../NameContext';

function Join() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { setUserName } = useContext(NameContext);

  const navigate= useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(name);
    if(!name){
      setError("Please Enter Name")
    }else{
      setError("");
      setUserName(name);
      navigate("/chat")
    }
  }

  return (
    <>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Box
        component="div"
        sx={{
          p: 2,
          border: "1px solid black",
          width: "400px",
          backgroundColor: "rgb(34,193,195)",
          textAlign: "center" 
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography>Chat App</Typography>
          <TextField label="Your Name" value={name} onChange={(e)=>setName(e.target.value)} variant="outlined" />
          <Typography style={{color:"red"}}>{error}</Typography>
          <Box sx={{ my:"10px"}}>
            <Button variant="contained" type="submit">Login</Button>
          </Box>
        </form>
      </Box>
    </div>
    </>
  );
}

export default Join;
