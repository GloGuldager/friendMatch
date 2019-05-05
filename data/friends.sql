DROP DATABASE IF EXISTS friends_db;
CREATE DATABASE friends_db;
USE friends_db;

create table survey (
id INT NOT NULL auto_increment,
name varchar (45) null,
picFile varchar (255) null,
question1 INT null,
question2 INT null,
question3 INT null,
question4 INT null,
question5 INT null,
question6 INT null,
question7 INT null,
question8 INT null,
question9 INT null,
question10 INT null,

primary key (id)
);

insert into survey (name, picFile, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10)
values ("testName", "/friend.png", 3, 3, 3, 3, 3, 3, 3, 3, 3, 3),
("testName2", "/friend.png", 4, 1, 4, 1, 4, 1, 4, 1, 4, 1),
("testName3", "/friend.png", 5, 2, 5, 2, 5, 2, 5, 2, 5, 2);

select * from survey;

SELECT SUM (question1, question2, question3, question4, question5, question6, question7, question8, question9, question10)
FROM survey
GROUP BY id
ORDER BY SUM DESC;



