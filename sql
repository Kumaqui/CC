CREATE DATABASE members;

USE members;
CREATE TABLE users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password CHAR(60) NOT NULL,
    email VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (username),
    UNIQUE KEY (email)
);

member_id INT(11) NOT NULL AUTO_INCREMENT,
member_pass CHAR(60) NOT NULL,
PRIMARY KEY (id)