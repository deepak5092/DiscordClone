-- Code at appservice.js line 292
INSERT INTO JOIN VALUES (:uname, :sid, null, null)

-- Code at appservice.js line 343
DELETE FROM Join WHERE sid = :sid and uname = :uname

-- Code at appservice.js line 312 and 322 respectively in changeRole function
SELECT * FROM ROLE r WHERE r.rname = :rname and r.colour = :colour
UPDATE JOIN SET rname = :rname, colour = :colour WHERE uname = :uname and sid = :sid

-- Code at appservice.js line 220 and 227 respectively in getTextChannels function
SELECT DISTINCT s.sid FROM Servers s, Invite i WHERE i.sid = s.sid and i.link = :link
SELECT DISTINCT ch.chid, ch.chname FROM Text_Channels ch, Servers s, Contain c WHERE ch.chid = c.chid and s.sid = c.sid and s.sid = :sid

-- Code at appservice.js line 265 and 272 respectively in getVoiceChannels function
SELECT DISTINCT s.sid FROM Servers s, Invite i WHERE i.sid = s.sid and i.link = :link
SELECT DISTINCT ch.chid, ch.chname FROM Voice_Channels ch, Servers s, Contain c WHERE ch.chid = c.chid and s.sid = c.sid and s.sid = :sid


-- Code at appservice.js line 363 and 372 respectively in search function
SELECT * FROM Servers WHERE sid = :sid and sname = :sname
SELECT * FROM Servers WHERE sid = :sid or sname = :sname

-- Code at appservice.js line 392 in getNumUsers()
SELECT sid, Count(uname) FROM Join GROUP BY sid

-- Code at appservice.js line 410 in filterServer(numUsers)
SELECT sid, Count(uname) FROM Join GROUP BY sid HAVING Count(uname) > :numUsers

-- Code at appservice.js line starting from line 429 in getPerfectServer()
SELECT s.sid, s.sname 
FROM Servers s 
WHERE NOT EXISTS ((SELECT u.uname FROM Users u) 
                   MINUS 
                   (SELECT j.uname 
                    FROM Join j 
                    WHERE j.sid = s.sid))
