DROP DATABASE IF EXISTS teamProject_24_04
CREATE DATABASE teamProject_24_04;
USE teamProject_24_04

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(255) NOT NULL,
    price VARCHAR(50) NOT NULL,
    imageURL VARCHAR(255) NOT NULL
);

CREATE TABLE article (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title TEXT,
    content TEXT
);


INSERT INTO article
SET title = '제목1',
content = '내용1'

INSERT INTO article
SET title = '제목2',
content = '내용2'

select * from article
SELECT * FROM products