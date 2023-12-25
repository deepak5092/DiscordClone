// This code is been made using help of CPSC 304 node starter code https://github.students.cs.ubc.ca/CPSC304/CPSC304_Node_Project/

const express = require('express');
const appService = require('./appService');

const router = express.Router();
// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

router.get('/demotable', async (req, res) => {
    const tableContent = await appService.fetchDemotableFromDb();
    res.json({data: tableContent});
});

router.post("/initiate-demotable", async (req, res) => {
    const initiateResult = await appService.initiateDemotable();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/insert-demotable", async (req, res) => {
    const { id, name } = req.body;
    const insertResult = await appService.insertDemotable(id, name);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/update-name-demotable", async (req, res) => {
    const { oldName, newName } = req.body;
    const updateResult = await appService.updateNameDemotable(oldName, newName);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.get('/count-demotable', async (req, res) => {
    const tableCount = await appService.countDemotable();
    if (tableCount >= 0) {
        res.json({ 
            success: true,  
            count: tableCount
        });
    } else {
        res.status(500).json({ 
            success: false, 
            count: tableCount
        });
    }
});

router.get('/fetch-servers', async (req, res) => {
    const tableContent = await appService.fetchServers();
    res.json({data: tableContent});
});

router.get('/fetch-jointable', async (req, res) => {
    const tableContent = await appService.fetchJoinTable();
    res.json({data: tableContent});
});

router.post('/register', async  (req, res) => {
    const registerResult = await appService.registerUser(req.body.username, req.body.password);
    console.log(registerResult)
    if (registerResult === 200) {
        res.status(200).json({
            success: true,
            message: `account created successfully for ${req.body.username}` 
        })
    } else if (registerResult === 409) {
        res.status(409).json({
            success: false,
            message: "account already exists"
        })
    } else {
        res.status(404).json({
            success: false,
            message: 'unusual error'
        })
    }
})

router.post('/login', async  (req, res) => {
    const login = await appService.login(req.body.username, req.body.password);
    console.log("Status = ", login)
    res.status(login).json({
        status: login
    })
})

router.post("/deleteUser", async (req, res) => {
    try {
        const deleteResult = await appService.deleteUser(req.body.username)
        console.log("Status = ", deleteResult)
        res.status(deleteResult).json({
            status: deleteResult
        })
    } catch (err) {
        console.log('error occured')
        res.status(500).json({
            status: 500
        })
    }
})

router.get("/server", async (req, res) => {
    try {
        const servers = await appService.getServers(req.body.username)
        if (servers === -1) {
            res.status(409).json({
                message: "Error"
            })
        }
        res.status(200).json({
            data: servers
        })
    } catch (err) {
        res.status(500).json({
            message: "error occurres"
        })
    }
})

router.post("/text-channels", async (req, res) => {
    try {
        const channels = await appService.getTextChannels(req.body.link)
        if (channels === -1) {
            res.status(409).json({
                success: false,
                message: "Error"
            })
        }
        res.status(200).json({
            success: true,
            data: channels
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "error occurres"
        })
    }
})

router.post("/voice-channels", async (req, res) => {
    try {
        const channels = await appService.getVoiceChannels(req.body.servername)
        if (channels === -1) {
            res.status(409).json({
                success: false,
                message: "Error"
            })
        }
        res.status(200).json({
            success: true,
            channels: channels
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "error occurres"
        })
    }
})

router.post("/joinserver", async (req, res) => {
    try {
        const links = await appService.joinServer(req.body.id, req.body.username)
        if (links === false) {
            res.status(400).json({
                success: false,
                message: "Error"
            })
        }
        res.status(200).json({
            success: true,
            message: "user added to the server"
        })
    } catch (err) {
        res.status(500).json({
            message: "error occurred"
        })
    }
})

router.get("/messages", async (req, res) => {
    try {
        const messages = await appService.getMessages(req.body.link)
        if (messages === -1) {
            res.status(400).json({
                success: false,
                message: "Error"
            })
        }
        res.status(200).json({
            success: true,
            message: messages
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "error occurred"
        })
    }
})

router.post("/role", async (req, res) => {
    try {
        const messages = await appService.changeRole(req.body.username, req.body.sid, req.body.newrname, req.body.newcolor)
        if (messages === false) {
            res.status(400).json({
                success: false,
                message: "Error"
            })
        }
        res.status(200).json({
            success: true,
            message: messages
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "error occurred"
        })
    }
})

router.post("/delete-server", async (req, res) => {
    try {
        const result = await appService.removeServer(req.body.id, req.body.username)
        if (!result) {
            res.status(400).json({
                success: false,
                message: "Error"
            })
        }
        console.log("success")
        res.status(200).json({
            success: true,
            message: "user left the server"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "error occurred"
        })
    }
})

router.post("/search", async (req, res) => {
    try {
        const result = await appService.search(req.body.id, req.body.name, req.body.query)
        console.log(result.length)
        if (!result || result.length === 0) {
            console.log("results are empty")
            res.status(400).json({
                success: false,
                message: "empty",
                data: null
            })
            return
        } else {
        console.log("success")
        res.status(200).json({
            success: true,
            data: result
        })
    }
    } catch (err) {
        console.log("In this block")
        res.status(500).json({
            success: false,
            data: null
        })
    }
})

router.get('/numUsers', async (req, res) => {
    try {
        const result = await appService.getNumUsers()
        console.log(result.length)
        if (!result || result.length === 0) {
            console.log("results are empty")
            res.status(400).json({
                success: false,
                message: "empty",
                data: null
            })
            return
        } else {
        console.log("success")
        res.status(200).json({
            success: true,
            data: result
        })
    }
    } catch (err) {
        console.log("In this block")
        res.status(500).json({
            success: false,
            data: null
        })
    }
})

router.post('/filter-server', async (req, res) => {
    try {
        const result = await appService.filterServer(req.body.numUsers)
        console.log(result.length)
        if (!result || result.length === 0) {
            console.log("results are empty")
            res.status(400).json({
                success: false,
                message: "empty",
                data: null
            })
            return
        } else {
        console.log("success")
        res.status(200).json({
            success: true,
            data: result
        })
    }
    } catch (err) {
        console.log("In this block")
        res.status(500).json({
            success: false,
            data: null
        })
    }
})

router.get('/perfect-servers', async (req, res) => {
    try {
        const result = await appService.getPerfectServer()
        console.log(result.length)
        if (!result || result.length === 0) {
            console.log("results are empty")
            res.status(400).json({
                success: false,
                message: "empty",
                data: null
            })
            return
        } else {
        console.log("success")
        res.status(200).json({
            success: true,
            data: result
        })
    }
    } catch (err) {
        console.log("In this block")
        res.status(500).json({
            success: false,
            data: null
        })
    }
})

// router.post('/sendMessage', async  (req, res) => {
//     const sendMessageResult = await appService.sendMessage();
//     if (sendMessageResult) {
//         res.json({
//             success: true
//         })
//     }
// })


module.exports = router;
