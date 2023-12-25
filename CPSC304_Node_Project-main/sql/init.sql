-- dropping table 
select
    'drop table ' || table_name || ' cascade constraints;'
from
    user_tables;

drop table CHANNELS cascade constraints;
drop table CONTAIN cascade constraints;
drop table INVITE cascade constraints;
drop table JOIN cascade constraints;
drop table MESSAGES cascade constraints;
drop table ROLE cascade constraints;
drop table SEND cascade constraints;
drop table SERVERS cascade constraints;
drop table TEXT_CHANNELS cascade constraints;
drop table USERS cascade constraints;
drop table VOICE_CHANNELS cascade constraints;

-- Create tables 
CREATE TABLE Users (
    uname VARCHAR2(100) PRIMARY KEY,
    password VARCHAR2(100)
);

CREATE TABLE Servers (
    sid INT PRIMARY KEY,
    sname VARCHAR2(100)
);

CREATE TABLE Channels (
    chid INT PRIMARY KEY,
    chname VARCHAR2(100)
);

CREATE TABLE Voice_Channels (
    chid INT PRIMARY KEY,
    chname VARCHAR2(100)
);

CREATE TABLE Invite (
    link VARCHAR2(100) PRIMARY KEY,
    numuses INT,
    sid INT
);

CREATE TABLE Role (
    colour CHAR(6),
    rname VARCHAR2(100),
    PRIMARY KEY (colour, rname)
);

CREATE TABLE Messages (
    mid INT,
    content VARCHAR2(4000),
    chid INT,
    PRIMARY KEY (mid, chid)
);

CREATE TABLE Text_Channels (
    chid INT PRIMARY KEY,
    chname VARCHAR2(100)
);

-- Relations 
CREATE TABLE
Join (
    uname VARCHAR2(100),
    sid INT,
    colour CHAR(6),
    rname VARCHAR2(100)
);

CREATE TABLE Contain (sid INT, chid INT);

CREATE TABLE Send (uname VARCHAR2(100), mid INT, chid INT);

-- alter tables 
-- alter table Messages
ALTER TABLE
    Messages
ADD
    CONSTRAINT fk_messages_channel FOREIGN KEY (chid) REFERENCES Channels (chid) ON DELETE CASCADE;

-- alter table Invite
ALTER TABLE
    Invite
ADD
    CONSTRAINT fk_sid FOREIGN KEY (sid) REFERENCES Servers (sid) ON DELETE CASCADE;

-- alter table Join
ALTER TABLE
    Join
ADD
    PRIMARY KEY (uname, sid);

ALTER TABLE
    Join
ADD
    CONSTRAINT fk_join_users FOREIGN KEY (uname) REFERENCES Users (uname) ON DELETE CASCADE;

ALTER TABLE
    Join
ADD
    CONSTRAINT fk_join_servers FOREIGN KEY (sid) REFERENCES Servers (sid) ON DELETE CASCADE;

ALTER TABLE
    Join
ADD
    CONSTRAINT fk_join_role_color FOREIGN KEY (rname, colour) REFERENCES Role (rname, colour) ON DELETE CASCADE;

-- alter table Contain
ALTER TABLE
    Contain
ADD
    PRIMARY KEY (sid, chid);

ALTER TABLE
    Contain
ADD
    CONSTRAINT fk_contain_servers FOREIGN KEY (sid) REFERENCES Servers (sid) ON DELETE CASCADE;

ALTER TABLE
    Contain
ADD
    CONSTRAINT fk_contain_channel FOREIGN KEY (chid) REFERENCES Channels (chid) ON DELETE CASCADE;

-- alter table Send
ALTER TABLE
    Send
ADD
    CONSTRAINT pk_send PRIMARY KEY (mid, chid);

ALTER TABLE
    Send
ADD
    CONSTRAINT fk_send_messages FOREIGN KEY (mid, chid) REFERENCES Messages (mid, chid) ON DELETE CASCADE;

-- insert tables
INSERT INTO
    Users (uname, password)
VALUES
    ('uname1', 'password1');

INSERT INTO
    Users (uname, password)
VALUES
    ('uname2', 'password2');

INSERT INTO
    Users (uname, password)
VALUES
    ('uname3', 'password3');

INSERT INTO
    Users (uname, password)
VALUES
    ('uname4', 'password4');

INSERT INTO
    Users (uname, password)
VALUES
    ('uname5', 'password5');

INSERT INTO
    Servers (sid, sname)
VALUES
    (1, 'Server1');

INSERT INTO
    Servers (sid, sname)
VALUES
    (2, 'Server2');

INSERT INTO
    Servers (sid, sname)
VALUES
    (3, 'Server3');

INSERT INTO
    Servers (sid, sname)
VALUES
    (4, 'Server4');

INSERT INTO
    Servers (sid, sname)
VALUES
    (5, 'Server5');

INSERT INTO
    Channels (chid, chname)
VALUES
    (1, 'TextChannel1');

INSERT INTO
    Channels (chid, chname)
VALUES
    (2, 'TextChannel2');

INSERT INTO
    Channels (chid, chname)
VALUES
    (3, 'TextChannel3');

INSERT INTO
    Channels (chid, chname)
VALUES
    (4, 'TextChannel4');

INSERT INTO
    Channels (chid, chname)
VALUES
    (5, 'TextChannel5');

INSERT INTO
    Channels (chid, chname)
VALUES
    (6, 'VoiceChannel1');

INSERT INTO
    Channels (chid, chname)
VALUES
    (7, 'VoiceChannel2');

    INSERT INTO
    Channels (chid, chname)
VALUES
    (8, 'VoiceChannel3');

INSERT INTO
    Channels (chid, chname)
VALUES
    (9, 'VoiceChannel4');

INSERT INTO
    Channels (chid, chname)
VALUES
    (10, 'VoiceChannel5');


INSERT INTO
    Voice_Channels (chid, chname)
VALUES
    (6, 'VoiceChannel1');

INSERT INTO
    Voice_Channels (chid, chname)
VALUES
    (7, 'VoiceChannel2');

INSERT INTO
    Voice_Channels (chid, chname)
VALUES
    (8, 'VoiceChannel3');

INSERT INTO
    Voice_Channels (chid, chname)
VALUES
    (9, 'VoiceChannel4');

INSERT INTO
    Voice_Channels (chid, chname)
VALUES
    (10, 'VoiceChannel5');

INSERT INTO
    Invite (link, numuses, sid)
VALUES
    ('InviteLink1', 1, 1);

INSERT INTO
    Invite (link, numuses, sid)
VALUES
    ('InviteLink2', 2, 2);

INSERT INTO
    Invite (link, numuses, sid)
VALUES
    ('InviteLink3', 3, 3);

INSERT INTO
    Invite (link, numuses, sid)
VALUES
    ('InviteLink4', 4, 4);

INSERT INTO
    Invite (link, numuses, sid)
VALUES
    ('InviteLink5', 5, 5);

INSERT INTO
    Role (colour, rname)
VALUES
    ('color1', 'Role1');

INSERT INTO
    Role (colour, rname)
VALUES
    ('color2', 'Role2');

INSERT INTO
    Role (colour, rname)
VALUES
    ('color3', 'Role3');

INSERT INTO
    Role (colour, rname)
VALUES
    ('color4', 'Role4');

INSERT INTO
    Role (colour, rname)
VALUES
    ('color5', 'Role5');

INSERT INTO
    Messages (mid, content, chid)
VALUES
    (1, 'content1', 1);

INSERT INTO
    Messages (mid, content, chid)
VALUES
    (2, 'content2', 1);

INSERT INTO
    Messages (mid, content, chid)
VALUES
    (3, 'content3', 2);

INSERT INTO
    Messages (mid, content, chid)
VALUES
    (4, 'content4', 2);

INSERT INTO
    Messages (mid, content, chid)
VALUES
    (5, 'content5', 3);

INSERT INTO
    Text_Channels (chid, chname)
VALUES
    (1, 'TextChannel1');

INSERT INTO
    Text_Channels (chid, chname)
VALUES
    (2, 'TextChannel2');

INSERT INTO
    Text_Channels (chid, chname)
VALUES
    (3, 'TextChannel3');

INSERT INTO
    Text_Channels (chid, chname)
VALUES
    (4, 'TextChannel4');

INSERT INTO
    Text_Channels (chid, chname)
VALUES
    (5, 'TextChannel5');

INSERT INTO
    Join (uname, sid, colour, rname)
VALUES
    ('uname1', 1, 'color1', 'Role1');

INSERT INTO
    Join (uname, sid, colour, rname)
VALUES
    ('uname2', 2, 'color2', 'Role2');

INSERT INTO
    Join (uname, sid, colour, rname)
VALUES
    ('uname3', 3, 'color3', 'Role3');

INSERT INTO
    Join (uname, sid, colour, rname)
VALUES
    ('uname4', 4, 'color4', 'Role4');

INSERT INTO
    Join (uname, sid, colour, rname)
VALUES
    ('uname5', 5, 'color5', 'Role5');

INSERT INTO
    Contain (sid, chid)
VALUES
    (1, 1);

INSERT INTO
    Contain (sid, chid)
VALUES
    (1, 2);

INSERT INTO
    Contain (sid, chid)
VALUES
    (2, 3);

INSERT INTO
    Contain (sid, chid)
VALUES
    (2, 4);

INSERT INTO
    Contain (sid, chid)
VALUES
    (3, 5);

INSERT INTO
    Send (uname, mid, chid)
VALUES
    ('uname1', 1, 1);

INSERT INTO
    Send (uname, mid, chid)
VALUES
    ('uname2', 2, 1);

INSERT INTO
    Send (uname, mid, chid)
VALUES
    ('uname3', 3, 2);

INSERT INTO
    Send (uname, mid, chid)
VALUES
    ('uname4', 4, 2);

INSERT INTO
    Send (uname, mid, chid)
VALUES
    ('uname5', 5, 3);