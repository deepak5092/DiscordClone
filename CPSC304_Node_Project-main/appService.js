// This code is been made using help of CPSC 304 node starter code https://github.students.cs.ubc.ca/CPSC304/CPSC304_Node_Project/

const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');

const envVariables = loadEnvFile('./.env');

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
    user: envVariables.ORACLE_USER,
    password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`
};


// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        return await action(connection);
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}


// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
    return await withOracleDB(async (connection) => {
        return true;
    }).catch(() => {
        return false;
    });
}


async function fetchDemotableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT id, name FROM DEMOTABLE');
        console.log(result.rows)
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function initiateDemotable() {
    return await withOracleDB(async (connection) => {
        try {
            await connection.execute(`DROP TABLE DEMOTABLE`);
        } catch(err) {
            console.log('Table might not exist, proceeding to create...');
        }
        
        const result = await connection.execute(`
        CREATE TABLE DEMOTABLE (
            id NUMBER PRIMARY KEY,
            name VARCHAR2(20)
            )
            `);
            return true;
        }).catch(() => {
            return false;
        });
    }
    
    async function insertDemotable(id, name) {
        return await withOracleDB(async (connection) => {
            const result = await connection.execute(
                `INSERT INTO DEMOTABLE (id, name) VALUES (:id, :name)`,
                [id, name],
                { autoCommit: true }
                );
                
                return result.rowsAffected && result.rowsAffected > 0;
            }).catch(() => {
                return false;
            });
        }
        
        async function updateNameDemotable(oldName, newName) {
            return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE DEMOTABLE SET name=:newName where name=:oldName`,
            [newName, oldName],
            { autoCommit: true }
            );
            
            return result.rowsAffected && result.rowsAffected > 0;
        }).catch(() => {
            return false;
        });
    }
    
    async function countDemotable() {
        return await withOracleDB(async (connection) => {
            const result = await connection.execute('SELECT Count(*) FROM DEMOTABLE');
            return result.rows[0][0];
        }).catch(() => {
            return -1;
        });
    }
    
async function registerUser(uname, password) {
    return await withOracleDB(async (connection) => {
        try {
            console.log("registering...")
            // console.log("Password = ", password)
            // const hash = bcrypt.hashSync(password, 10)
            console.log("Hash generated")
            const result = await connection.execute(
                'INSERT INTO Users (uname, password) VALUES (:uname, :password)',
                [uname, password],
                { autoCommit: true });
                return (result.rowsAffected && result.rowsAffected > 0) ? 200 : 409;
            } catch (err) {
                if (err.errorNum === 1) {
                    return 409
                } else {
                    console.log(err)
                }
            }      
    }).catch(() => {
        return 500;
    });
}

// async function login(uname, password) {
//     return await withOracleDB(async (connection) => {
//         try {
//             const result = await connection.execute(
//                     'SELECT * FROM Users WHERE uname = :uname',
//                     [uname],
//                     { autoCommit: true });
//             if (!result) {
//                 return 422
//             }
//             if (result.rows[0][0] === uname) {
//                 console.log("Usernames match, Welcome ", result.rows[0][0])
//                 console.log("Checking password...")
//                 // if (bcrypt.compareSync(password, result.rows[0][1])) {
//                 //     console.log("Passwords match, welcome")
//                 //     return 200
//                 // }

//                 if (password === result.rows[0][1]) {
//                     console.log("Passwords match, welcome")
//                     return 200
//                 }

//                 return 422
//             }
//         } catch (err) {
//             console.log(err)
//             return 422
//         }
//     }).catch(() => {
//         return 500;
//     });
// }



// async function deleteUser(uname) {
//     return await withOracleDB(async (connection) => {
//         try {
//             console.log("Deactivating account")
//             await connection.execute(
//                     'DELETE FROM Users WHERE uname = :uname', 
//                     [uname],
//                     { autoCommit: true });
//             console.log("Account Deactivated")
//             return 200
//         } catch(err) {
//             console.log(err)
//             console.log("Couldn't deactivate account, maybe it was already deactivated")
//             return 410
//         }
//     }).catch((err) => {
//         return 500;
//     });
// }

async function getServers(uname) {
    return await withOracleDB(async (connection) => {
        try {
            console.log("fetching servers")
            const result = await connection.execute(`
                SELECT DISTINCT s.sname FROM Servers s, Join j, Users u WHERE u.uname = j.uname and s.sid = j.sid and u.uname = :uname`,
                [uname],
                { autoCommit: true });
            return result.rows
        } catch (err) {
            console.log(err)
            return -1
        }
    }).catch((err) => {
        return -1;
    });
}

async function getTextChannels(link) {
    return await withOracleDB(async (connection) => {
        try {
            console.log("Getting server using link")
            const result1 = await connection.execute(`
                SELECT DISTINCT s.sid FROM Servers s, Invite i WHERE i.sid = s.sid and i.link = :link`,
                [link],
                { autoCommit: true });
            const sid = result1.rows[0][0]
            console.log(sid)
            console.log("fetching text channels")
            const result = await connection.execute(`
                SELECT DISTINCT ch.chid, ch.chname FROM Text_Channels ch, Servers s, Contain c WHERE ch.chid = c.chid and s.sid = c.sid and s.sid = :sid`,
                [sid],
                { autoCommit: true });
            return result.rows
        } catch (err) {
            console.log(err)
            return -1
        }
    }).catch((err) => {
        return -1;
    });
}

async function fetchServers() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT sid, sname FROM Servers');
        console.log(result.rows)
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchJoinTable() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Join');
        console.log(result.rows)
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function getVoiceChannels(link) {
    return await withOracleDB(async (connection) => {
        try {
            console.log("Getting server using link")
            const result1 = await connection.execute(`
                SELECT DISTINCT s.sid FROM Servers s, Invite i WHERE i.sid = s.sid and i.link = :link`,
                [link],
                { autoCommit: true });
            const sid = result1.rows[0][0]
            console.log(sid)
            console.log("fetching text channels")
            const result = await connection.execute(`
                SELECT DISTINCT ch.chid, ch.chname FROM Voice_Channels ch, Servers s, Contain c WHERE ch.chid = c.chid and s.sid = c.sid and s.sid = :sid`,
                [sid],
                { autoCommit: true });
            return result.rows
        } catch (err) {
            console.log(err)
            return -1
        }
    }).catch((err) => {
        return -1;
    });
}

async function joinServer(id, uname) {

    return await withOracleDB(async (connection) => {
        try {
            console.log("joining server")
            console.log(id, uname)
            const result = await connection.execute(`
            INSERT INTO JOIN VALUES (:uname, :sid, null, null)`,
            [uname, id],
            { autoCommit: true })
            return result.rowsAffected && result.rowsAffected > 0 

        } catch (err) {
            message = err.message
            console.log(message)
            return false
        }
    }).catch((err) => {
        return false;
    });
}

async function changeRole(uname, sid, newrname, newcolor) {
    return await withOracleDB(async (connection) => {
        try {
            console.log("fetching new roles")
            const result = await connection.execute(`
            SELECT * FROM ROLE r WHERE r.rname = :rname and r.colour = :colour`,
            [newrname, newcolor],
            { autoCommit: true });
            let role = null
            if (result.rows && result.rows[0] && result.rows[0].length > 0) {
                role = result.rows[0][0]
            } else {
                return false
            }
            const result2 = await connection.execute(`
            UPDATE JOIN SET rname = :rname, colour = :colour WHERE uname = :uname and sid = :sid`,
            [newrname, newcolor, uname, sid],
            { autoCommit: true });
            return result2.rowsAffected && result2.rowsAffected > 0 
            
        } catch (err) {
            message = err.message
            console.log(message)
            return false
        }
    }).catch((err) => {
        return false;
    });
}

async function removeServer(id, uname) {
    return await withOracleDB(async (connection) => {
        try {
            console.log("getting server using the id")
            console.log(id, uname)
            const result = await connection.execute(`
                DELETE FROM Join WHERE sid = :sid and uname = :uname`,
                [id, uname],
                { autoCommit: true });
            return result.rowsAffected && result.rowsAffected > 0
        } catch (err) {
            message = err.message
            console.log(message)
            return false
        }
    }).catch((err) => {
        return false;
    });
}

async function search(id, name, query) {
    return await withOracleDB(async (connection) => {
        try {
            console.log("Query = ", query)
            if (query === 'AND') {
                const result = await connection.execute(`
                    SELECT * FROM Servers WHERE sid = :sid and sname = :sname`,
                    [id, name],
                    { autoCommit: true });
                console.log(result.rows.length)
                return result.rows
            }

            if (query === 'OR') {
                const result = await connection.execute(`
                    SELECT * FROM Servers WHERE sid = :sid or sname = :sname`,
                    [id, name],
                    { autoCommit: true });
                console.log(result)
                return result.rows
            }
        } catch (err) {
            message = err.message
            console.log(message)
            return null
        }
    }).catch((err) => {
        return null;
    });
}

async function getNumUsers() {
    return await withOracleDB(async (connection) => {
        try {
            const result = await connection.execute(`
            SELECT sid, Count(uname) FROM Join GROUP BY sid
            `)
            console.log(result)
            return result.rows
        } catch (err) {
            message = err.message
            console.log(message)
            return null
        }
    }).catch((err) => {
        return null;
    }); 
}

async function filterServer(numUsers) {
    return await withOracleDB(async (connection) => {
        try {
            const result = await connection.execute(`
            SELECT sid, Count(uname) FROM Join GROUP BY sid HAVING Count(uname) > :numUsers`,
            [numUsers],
            { autoCommit: true });
            console.log(result)
            return result.rows
        } catch (err) {
            message = err.message
            console.log(message)
            return null
        }
    }).catch((err) => {
        return null;
    }); 
}

async function getPerfectServer() {
    return await withOracleDB(async (connection) => {
        try {
            const result = await connection.execute(`
                SELECT s.sid, s.sname 
                FROM Servers s 
                WHERE NOT EXISTS ((SELECT u.uname FROM Users u) 
                                MINUS 
                                (SELECT j.uname 
                                    FROM Join j 
                                    WHERE j.sid = s.sid))
            `);
            console.log(result)
            return result.rows
        } catch (err) {
            message = err.message
            console.log(message)
            return null
        }
    }).catch((err) => {
        return null;
    });
}

// async function getMessages(link) {
//     return await withOracleDB(async (connection) => {
//         try {
//             console.log("fetching message")
//             const result = await connection.execute(`
//             `,
//             [link],
//             { autoCommit: true });
//             return result.rows
//         } catch (err) {
//             console.log(err)
//             return -1
//         }
//     }).catch((err) => {
//         return -1;
//     });
// }

module.exports = {
    testOracleConnection,
    fetchDemotableFromDb,
    initiateDemotable, 
    insertDemotable, 
    updateNameDemotable, 
    countDemotable,
    registerUser,
    // deleteUser,
    // login,
    getServers,
    getTextChannels,
    getVoiceChannels,
    joinServer,
    // getMessages,
    changeRole,
    removeServer,
    fetchServers,
    fetchJoinTable,
    search,
    getNumUsers,
    filterServer,
    getPerfectServer
};
