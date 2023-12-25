import { Button, InputAdornment, IconButton, TextField, Select, MenuItem} from '@material-ui/core';
import {Visibility, VisibilityOff} from "@material-ui/icons"
import {Box} from "@mui/system" 
import axios from "axios"

import React, {useState} from "react"

const ENDPOINT = "http://localhost:50056";
// todo: 
// UPDATE: update role take colour and take role name DONE
// DELETE: button that takes id and deletes message, take username and id as args DONE
// SELECTION:  2 more text inputs id and name, and AND/OR dropdown 
// AGGREGATION: Count number of messages sent per person in channel (button)
// HAVING: FILTER NUMBER OF SERVERS WITH > x DONEx
// DIVISION: LIST SERVERS WITH ALL USERS

function Login() {
  const [username, setUsername] = useState("adfa");
  const [password, setPassword] = useState("");
  const [loggedin, setLoggedin] = useState(false)
  const [showPassword, setShowPassword] = useState("");
  const [servers, setServers] = useState([["kjldasjf"]])
  const [rolename, setRoleName] = useState("")
  const [rolecolour, setRoleColour] = useState("")
  const [server, setServer] = useState("")
  const [voicechannels, setVoiceChannels] = useState([])
  const [voicechannel, setVoiceChannel] = useState()
  const [textchannels, setTextChannels] = useState([])
  const [textchannel, setTextChannel] = useState()
  const [messages, setMessages] = useState(["adsfas", "adfadf"])
  const [message, setMessage] = useState("")
  const [filterServer, setFilterServer] = useState(0)
  const [deletemessage, setDeleteMessage] = useState(0)
  const [serverlink, setServerLink] = useState("")
  const [filterservername, setFilterServerName] = useState("")
  const [filterserverid, setFilterServerID] = useState()
  const [filterop, setFilterOP] = useState()

  const handleUsername = (e) => { 
    setUsername(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleshowPassword = (e) => {
    setShowPassword(!showPassword)
  }

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  }

  const handleServerChange = (e) => {
    setServer(e.target.value);
  }

  function handleVoiceChannelChange(e) {
    setVoiceChannel(e.target.value);
  }

  function handleTextChannelChange(e) {
    setTextChannel(e.target.value);
  }

  function handleFilterServerChange(e) {
    setFilterServer(e.target.value);
  }

  function handleRoleNameChange(e) {
    setRoleName(e.target.value);
  }

  function handleRoleColourChange(e) {
    setRoleColour(e.target.value);
  }

  function handleDeleteMessageChange(e) {
    setDeleteMessage(e.target.value);
  }

  function handleServerLinkChange(e) {
    setServerLink(e.target.value)
  } 

  function handleFilterServerNameChange(e) {
    setFilterServerName(e.target.value)
  }

  function handleFilterServerIDChange(e) {
    setFilterServerID(e.target.value)
  }

  const handleJoinServer = () => {
    const regex = /[^\w]/
    if (regex.test(serverlink)) {
      alert("Invalid server link");
      return 
    }
    axios.post(`${ENDPOINT}/joinserver`, {
      link: serverlink,
      username: username
    }).then(
      alert("server joined successfully") 
    ).catch(error => {
      console.error(error);
      alert("Could not join server")
    })


  }


  const handleDeleteMessage = () => {
    axios.post(`${ENDPOINT}/deletemessage`, { 
      channel: textchannel, id: deletemessage, username: username
    }).then(response => {
      alert("Message Deleted Successfully")
    }).catch(error => {
      console.error(error)
      alert("Delete Message Failed")
    })
  }

  const handleLoadMessages = () => {
    axios.post(`${ENDPOINT}/loadmessages`, { 
      channel: textchannel
    }).then(response => {
      setMessages(response.data)
    }).catch(error => {
      console.error(error)
      alert("Could not load messages")
    })
  }

  const handleGetServer = () => {
    let filter = 0
    if (filterServer) {
      filter = filterServer;
    } 
    axios.get(`${ENDPOINT}/server`,
     {filter: filter, username:username })
     .then(response => {
      setServers(response.data)
     }).catch(error => {console.error(error)})
  } 
  const handleGetVoiceChannels = () => {
    axios.get(`${ENDPOINT}/voice-channels`,
     {server: server, username:username })
     .then(response => {
      setVoiceChannels(response.data)
     }).catch(error => {
      console.error(error);
      alert("could not load voice channels")
    })
  } 
  const handleGetTextChannels = () => {
    axios.get(`${ENDPOINT}/text-channels`,
     {server: server, username:username })
     .then(response => {
      setTextChannels(response.data)
     }).catch(error => {
      console.error(error);
      alert("could not load text channels")})
  } 

  const handleRoleChange = (e) => {
    e.preventDefault()
    const regex = /[^\w]/
    if (regex.test(rolename)) {
      alert("ROLENAME CANNOT CONTAIN SPECIAL CHARACTERS");
      return 
    }
    axios.post(`${ENDPOINT}/changerole`, {rolename: rolename, rolecolour: rolecolour})
    .then((result) => {
      alert("Role changed successfully")
    }).catch((err) => {
        if (err.response.status === 409) {
            alert("Name Colour Combo in use already")
        } else {
          console.log(err)
            alert("An unusual error occured")
            
        }
    })
  }

  // const handleChangeUsername = () => {
  //   const regex = /[^\w]/
  //   if (regex.test(newusername)) {
  //     alert("USERNAME CANNOT CONTAIN SPECIAL CHARACTERS");
  //     return
  //   } 
  //     axios.get(`${ENDPOINT}/changeusername`, {
  //       username: username,
  //       newusername: newusername}).then((result) => {
  //         alert("Username changed successfully")
  //       }).catch((err) => {
  //           if (err.response.status === 409) {
  //               alert("Username in use already")
  //           } else {
  //             console.log(err)
  //               alert("An unusual error occured")
                
  //           }
  //       })
  // } 

  const handleServersAllUsers = () => {
    axios.get(`${ENDPOINT}/allusersservers`)
    .then(response => {
      alert("ALL SERVERS")
    })




  }


  const handleDeleteUser = () => {
 
      axios.post(`${ENDPOINT}/deleteUser` , {
        username: username,
      }).then(response => {
        alert("deleted account successfully");
        setUsername("")
      }).catch(error => {
        console.error(error)
        alert("something went wrong with deletion")
      })

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
    axios.post(`${ENDPOINT}/login`, {username, password})
    .then((result) => {
        //success handler
        setUsername(username);
        setLoggedin(true);
    }).catch((err) => {
        if (err.response.status === 422) {
            alert("Incorrect username combo")
        } else {
          console.log(err)
            alert("An unusual error occured")
            
        }
    })
  }

  const handleSend = () => {
    if (message) {
      axios.post(`${ENDPOINT}/sendmessage` , {
        channel: textchannel,
        author: username,
        message: message
      }).then(response => {
        
        setMessage("");
      }).catch(error => {
        console.error(error)
      })
    }
  } 


  return (

    <div>
      {/* show login screen if not logged in  */}
      {loggedin?  (
    <div className="App" style={{ display: 'flex', height: '100vh' }}>
    {/* left 1/4 of the page */}

    <div style={{ width: '31%', padding: '5px' }}>
    <p>Logged in as {username}</p>

    <h4>JOIN SERVER</h4>
      <TextField label="server link" value={serverlink} onChange={handleServerLinkChange} style={{ width: '48%' }} />
      <Button variant="contained" color="primary" onClick={handleJoinServer}>  Join Server</Button>
      <TextField label="filter more than" value={filterServer} onChange={handleFilterServerChange} style={{ width: '48%' }} />


    <Button variant="contained" color="primary" onClick={handleGetServer}>REFRESH SERVERS</Button>
    <Button variant="contained" color="primary" onClick={handleGetVoiceChannels}>REFRESH VOICE</Button>
    <Button variant="contained" color="primary" onClick={handleGetTextChannels}>REFRESH TEXT </Button>

        
      <h4>Select Server</h4>
      <Select value={server} onChange={handleServerChange} style={{ width: '100%' }}>
        {servers.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
      </Select>
      <h4>Select Voice Channels&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     Select Text channels</h4>   
      <Select value={voicechannel} onChange={handleVoiceChannelChange} style={{ width: '50%' }}>
      {voicechannels.map(vc => <MenuItem key={vc} value={vc}>{vc}</MenuItem>)}
      </Select>

      <Select value={textchannel} onChange={handleTextChannelChange} style={{ width: '50%' }}>
      {textchannels.map(tc => <MenuItem key={tc} value={tc}>{tc}</MenuItem>)}
      </Select>

        <h4>Filter Server</h4>
        <TextField label="Server ID" value={filterserverid} onChange={handleFilterServerIDChange} style={{ width: '33%' }} />
      <TextField label="Server Name" value={filterservername} onChange={handleFilterServerNameChange} style={{ width: '33%' }} />


    </div>
    {/* middle 1/2 of the page */}
    <div style={{ width: '47%', padding: '5px', overflowY: 'scroll' }}>
      <h4>Messages</h4>
      <Button variant="contained" color="primary" onClick={handleLoadMessages}>LOAD MESSAGES</Button>
      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {messages.map(m => <p> {m}</p>)}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField value={message} onChange={handleMessageChange} style={{ flex: 1 }} fullWidth/>
        <Button variant="contained" color="primary" onClick={handleSend}>SEND</Button>
      </div>
    </div>
    {/* right 1/4 of the page */}
    <div style={{ width: '23%', padding: '5px' }}>
    {/* <h4>Change Username</h4>
      <TextField label="NEW USERNAME" value={newusername} onChange={handlenewUsername} style={{ width: '100%' }} />
      <Button variant="contained" color="primary" onClick={handleChangeUsername}>CHANGE USERNAME</Button> */}
      <h4>DELETE MESSAGE</h4>
      <TextField label="Delete Message ID" value={deletemessage} onChange={handleDeleteMessageChange} style={{ width: '48%' }} />
      <Button variant="contained" color="primary" onClick={handleDeleteMessage}> DELETE MESSAGE</Button>
     <h4>Change ROLE</h4>
      <TextField label="NEW ROLE NAME" value={rolename} onChange={handleRoleNameChange} style={{ width: '50%' }} />
      <TextField label="NEW ROLE COLOUR" value={rolecolour} onChange={handleRoleColourChange} style={{ width: '50%' }} />
      <Button variant="contained" color="primary" onClick={handleRoleChange}>UPDATE ROLE</Button>
      <Button variant="contained" color="primary" onClick={handleDeleteUser}>DELETE ACCOUNT</Button>

    </div>
  </div>




      ): 
    (<form onSubmit={handleSubmit}>
    <Box sx={{position:"absolute", top:"20%", left:"43%",display:"flex", flexDirection:"column", alignItems:"center",  height:"100vh", width:"200px"}}>
       LOGIN
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
      LOGIN
    </Button>
</Box>
    
</form>)}
</div>
    

  );
}

export default Login;
