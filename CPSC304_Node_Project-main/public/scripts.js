/*
 * These functions below are for various webpage functionalities. 
 * Each function serves to process data on the frontend:
 *      - Before sending requests to the backend.
 *      - After receiving responses from the backend.
 * 
 * To tailor them to your specific needs,
 * adjust or expand these functions to match both your 
 *   backend endpoints 
 * and 
 *   HTML structure.
 * 
 */


// This code is been made using help of CPSC 304 node starter code https://github.students.cs.ubc.ca/CPSC304/CPSC304_Node_Project/
// This function checks the database connection and updates its status on the frontend.
async function checkDbConnection() {
    const statusElem = document.getElementById('dbStatus');
    const loadingGifElem = document.getElementById('loadingGif');

    const response = await fetch('/check-db-connection', {
        method: "GET"
    });

    // Hide the loading GIF once the response is received.
    loadingGifElem.style.display = 'none';
    // Display the statusElem's text in the placeholder.
    statusElem.style.display = 'inline';

    response.text()
    .then((text) => {
        statusElem.textContent = text;
    })
    .catch((error) => {
        statusElem.textContent = 'connection timed out';  // Adjust error handling if required.
    });
}


// Fetches data from the Server Table and displays it.
async function fetchAndDisplayServers() {
    const tableElement = document.getElementById('demotable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/fetch-servers', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;
    console.log(demotableContent)

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// Displays retrieved text channels
async function DisplayTextChannels(tableContent) {
    const tableElement = document.getElementById('textChannelTable');
    const tableBody = tableElement.querySelector('tbody');

    // const response = await fetch('/fetch-servers', {
    //     method: 'GET'
    // });

    // const responseData = await response.json();
    // const demotableContent = responseData.data;
    // console.log(demotableContent)

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    tableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// Displays retrived voice channels
async function DisplayVoiceChannels(tableContent) {
    const tableElement = document.getElementById('voiceChannelTable');
    const tableBody = tableElement.querySelector('tbody');

    // const response = await fetch('/fetch-servers', {
    //     method: 'GET'
    // });

    // const responseData = await response.json();
    // const demotableContent = responseData.data;
    // console.log(demotableContent)

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    tableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function DisplaySearchResult(tableContent) {
    const tableElement = document.getElementById('searchServerTable');
    const tableBody = tableElement.querySelector('tbody');

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    tableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function DisplayNumUserResult(tableContent) {
    const tableElement = document.getElementById('filterServerTable');
    const tableBody = tableElement.querySelector('tbody');

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    tableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

async function DisplayPerfectServerResult(tableContent) {
    const tableElement = document.getElementById('perfectServerTable');
    const tableBody = tableElement.querySelector('tbody');

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    tableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// Fetches data from the Join Table and displays it.
async function fetchAndDisplayJoin() {
    const tableElement = document.getElementById('jointable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/fetch-jointable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;
    console.log(demotableContent)

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// This function resets or initializes the demotable.
async function resetDemotable() {
    const response = await fetch("/initiate-demotable", {
        method: 'POST'
    });
    const responseData = await response.json();

    if (responseData.success) {
        const messageElement = document.getElementById('resetResultMsg');
        messageElement.textContent = "demotable initiated successfully!";
        fetchTableData();
    } else {
        alert("Error initiating table!");
    }
}

// Inserts new records into the demotable.
async function insertDemotable(event) {
    event.preventDefault();

    const idValue = document.getElementById('insertId').value;
    const nameValue = document.getElementById('insertName').value;

    const response = await fetch('/insert-demotable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: idValue,
            name: nameValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('insertResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Data inserted successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error inserting data!";
    }
}

// Updates names in the demotable.
async function updateNameDemotable(event) {
    event.preventDefault();

    const oldNameValue = document.getElementById('updateOldName').value;
    const newNameValue = document.getElementById('updateNewName').value;

    const response = await fetch('/update-name-demotable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            oldName: oldNameValue,
            newName: newNameValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('updateNameResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Name updated successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error updating name!";
    }
}

// Counts rows in the demotable.
// Modify the function accordingly if using different aggregate functions or procedures.
async function countDemotable() {
    const response = await fetch("/count-demotable", {
        method: 'GET'
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('countResultMsg');

    if (responseData.success) {
        const tupleCount = responseData.count;
        messageElement.textContent = `The number of tuples in demotable: ${tupleCount}`;
    } else {
        alert("Error in count demotable!");
    }
}

async function joinServer() {
    event.preventDefault();

    const id = document.getElementById('addId').value;
    const name = document.getElementById('addUserName').value;

    const response = await fetch('/joinserver', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            username: name
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('ResultOfAdd');

    if (responseData.success) {
        messageElement.textContent = "Added User successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error updating name!";
    }
}


async function leaveServer() {
    event.preventDefault();

    const id = document.getElementById('removeId').value;
    const username = document.getElementById('removeUserName').value;

    const response = await fetch('/delete-server', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            username: username
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('ResultOfRemove');

    if (responseData.success) {
        messageElement.textContent = "Removed user successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error updating name!";
    }
}

async function updateRole() {
    event.preventDefault();
    
    const id = document.getElementById('updateId').value;
    const username = document.getElementById('updatename').value;
    const name = document.getElementById('rolename').value;
    const colour = document.getElementById('rolecolour').value;

    const response = await fetch('/role', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            sid: id,
            newrname: name,
            newcolor: colour
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('ResultOfUpdate');

    if (responseData.success) {
        messageElement.textContent = "Updated role successfuly!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error updating role!";
    }
}

async function getTextChannel() {
    event.preventDefault();
    console.log("enterd function")
    const link = document.getElementById('getTextServerLink').value;
    console.log(link)

    const response = await fetch('/text-channels', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            link: link
        })
    });

    const responseData = await response.json();
    const demoTable = responseData.data
    const messageElement = document.getElementById('ResultOfGetTextChannel');

    if (responseData.success) {
        messageElement.textContent = "Text channels loaded successfully!";
        console.log(demoTable)
        DisplayTextChannels(demoTable);
    } else {
        messageElement.textContent = "Error retrieving channels!";
    }
}

async function getVoiceChannel() {
    event.preventDefault();
    console.log("enterd function")
    const link = document.getElementById('getVoiceServerLink').value;
    console.log(link)

    const response = await fetch('/voice-channels', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            link: link
        })
    });

    const responseData = await response.json();
    const demoTable = responseData.data
    const messageElement = document.getElementById('ResultOfGetVoiceChannel');

    if (responseData.success) {
        messageElement.textContent = "Voice channels loaded successfully!";
        console.log(demoTable)
        DisplayVoiceChannels(demoTable);
    } else {
        messageElement.textContent = "Error retrieving channels!";
    }
}

async function getSearchResults() {
    event.preventDefault();
    console.log("enterd function")
    const id = document.getElementById('sidSearch').value;
    const name = document.getElementById('nameSearch').value;
    const query = document.getElementById("query").value
    console.log(id, name, query)

    const response = await fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            name: name,
            query: query
        })
    });

    const responseData = await response.json();
    const demoTable = responseData.data
    const messageElement = document.getElementById('ResultOfSearch');

    console.log(responseData.success)

    if (responseData.success) {
        messageElement.textContent = "Search loaded successfully!";
        console.log(demoTable)
        DisplaySearchResult(demoTable);
    } else {
        console.log(responseData)
        if (responseData.message && responseData.message === "empty") {
            messageElement.textContent = "Search didn't find any result"
            DisplaySearchResult([]);
        } else {
            messageElement.textContent = "Error retrieving results!";
            DisplaySearchResult([]);
        }
    }
}

async function getNumUsers() {
    event.preventDefault();
    const response = await fetch('/numUsers', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;
    const messageElement = document.getElementById("ResultOfGetNumUsers")
    console.log(demotableContent)

    if (responseData.success) {
        messageElement.textContent = "success!";
        console.log(demotableContent)
        DisplayNumUserResult(demotableContent);
    } else {
        console.log(responseData)
        if (responseData.message && responseData.message === "empty") {
            messageElement.textContent = "There are no servers"
            DisplaySearchResult([]);
        } else {
            messageElement.textContent = "Error retrieving results!";
            DisplaySearchResult([]);
        }
    }
}

async function filterServer() {
    event.preventDefault();

    const numUsers = document.getElementById('filterNumUsers').value;

    const response = await fetch('/filter-server', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numUsers: numUsers
        })
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;
    const messageElement = document.getElementById("ResultOfFilterServers")
    console.log(demotableContent)

    if (responseData.success) {
        messageElement.textContent = "success!";
        console.log(demotableContent)
        DisplayNumUserResult(demotableContent);
    } else {
        console.log(responseData)
        if (responseData.message && responseData.message === "empty") {
            messageElement.textContent = "There are no such servers"
            DisplayNumUserResult([]);
        } else {
            messageElement.textContent = "Error retrieving results!";
            DisplayNumUserResult([]);
        }
    }
}

async function getPerfectServers() {
    event.preventDefault();
    const response = await fetch('/perfect-servers', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;
    const messageElement = document.getElementById("ResultOfPerfectServers")
    console.log(demotableContent)

    if (responseData.success) {
        messageElement.textContent = "success!";
        console.log(demotableContent)
        DisplayPerfectServerResult(demotableContent);
    } else {
        console.log(responseData)
        if (responseData.message && responseData.message === "empty") {
            messageElement.textContent = "There are no such servers"
            DisplayPerfectServerResult([]);
        } else {
            messageElement.textContent = "Error retrieving results!";
            DisplayPerfectServerResult([]);
        }
    }
}

// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function() {
    checkDbConnection();
    fetchTableData();
    // document.getElementById("resetDemotable").addEventListener("click", resetDemotable);
    // document.getElementById("insertDemotable").addEventListener("submit", insertDemotable);
    // document.getElementById("updataNameDemotable").addEventListener("submit", updateNameDemotable);
    // document.getElementById("countDemotable").addEventListener("click", countDemotable);

    document.getElementById("addServer").addEventListener("submit", joinServer);
    document.getElementById("removeServer").addEventListener("submit", leaveServer);
    document.getElementById("updateRole").addEventListener("submit", updateRole);
    document.getElementById("getTextChannel").addEventListener("submit", getTextChannel);
    document.getElementById("getVoiceChannel").addEventListener("submit", getVoiceChannel);
    document.getElementById("searchServer").addEventListener("submit", getSearchResults);
    document.getElementById("getNumUsers").addEventListener("submit", getNumUsers);
    document.getElementById("filterServers").addEventListener("submit", filterServer);
    document.getElementById("getPerfectServers").addEventListener("submit", getPerfectServers);        
};

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
function fetchTableData() {
    fetchAndDisplayServers();
    fetchAndDisplayJoin();
}
