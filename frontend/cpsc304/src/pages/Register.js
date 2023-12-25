import { Button, InputAdornment, IconButton, TextField } from '@material-ui/core';
import {Visibility, VisibilityOff} from "@material-ui/icons"
import {redirect} from "react-router-dom"
import {Box} from "@mui/system" 
import axios from "axios"

import React, {useState} from "react"

const ENDPOINT = "http://localhost:50056"

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleshowPassword = (e) => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const regex = /[^\w]/
    if (regex.test(password)) {
      alert("PASSWORD CANNOT CONTAIN SPECIAL CHARACTERS");
      return 
    }
    else if (regex.test(username)) {
      alert("USERNAME CANNOT CONTAIN SPECIAL CHARACTERS");
      return
    } 
    axios.post(`${ENDPOINT}/register`, {username, password})
    .then((result) => {
      alert("Account Created successfully")
      redirect=("/login")
    }).catch((err) => {
        if (err.response.status === 409) {
            alert("Username in use already")
        } else {
          console.log(err)
            alert("An unusual error occured")
            
        }
    })
  }

  return (

    <div>
    <form onSubmit={handleSubmit}>
    <Box sx={{position:"absolute", top:"20%", left:"43%",display:"flex", flexDirection:"column", alignItems:"center",  height:"100vh", width:"200px"}}>
      CREATE ACCOUNT
      <Box sx={{height:"30px"}}></Box>
    <TextField 
    label="Username"
    value={username}
    onChange={handleUsername}
    fullWidth
    required
    />

    <Box sx={{height:"30px"}}></Box>
    <TextField 
    label="Password"
    value={password}
    type={showPassword ? "text" : "password"}
    onChange={handlePassword}
    required
    InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={handleshowPassword}>
          {showPassword ? <Visibility/> : <VisibilityOff/>}
        </IconButton>
      </InputAdornment>
      ),
    }}
    />
    <Box sx={{height:"30px"}}></Box>
    <Button
    type="submit" variant="contained" color="secondary">
      Register Account
    </Button>
</Box>
    
</form>
</div>
    

  );
}

export default Register;
