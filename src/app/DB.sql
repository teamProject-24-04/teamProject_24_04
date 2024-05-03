DROP DATABASE IF EXISTS teamProject_24_04;
CREATE DATABASE teamProject_24_04;
USE teamProject_24_04;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(255) NOT NULL,
    price VARCHAR(50) NOT NULL,
    imageURL VARCHAR(255) NOT NULL
);

# member 테이블 생성
CREATE TABLE `member` (
  `id` INT(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `loginId` CHAR(20) NOT NULL,
  `loginPw` CHAR(80) NOT NULL,
  `address` CHAR(10) NOT NULL,
  `roadAddress` VARCHAR(255) NOT NULL,
  `jibunAddress` VARCHAR(255) NOT NULL,
  `latitude` DECIMAL(10, 8) NOT NULL,
  `longitude` DECIMAL(11, 8) NOT NULL
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

SELECT *
FROM `member`


SELECT * FROM article
SELECT * FROM products