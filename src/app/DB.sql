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

CREATE TABLE channels (
    id INT PRIMARY KEY AUTO_INCREMENT,
    NAME VARCHAR(255) NOT NULL
);


CREATE TABLE youtubers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    content_name VARCHAR(255) NOT NULL,
    fullName VARCHAR(255) NOT NULL,
    `body` TEXT,
    img_url VARCHAR(255)
);

CREATE TABLE videos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    video_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    channel_id INT,
    FOREIGN KEY (channel_id) REFERENCES channels(id)
);

CREATE TABLE video_ids (
    id INT PRIMARY KEY AUTO_INCREMENT,
    video_id VARCHAR(255) NOT NULL,
    video_title VARCHAR(255) NOT NULL,
    channel_id INT,
    FOREIGN KEY (channel_id) REFERENCES channels(id)
);

#####################################################################

SELECT *
FROM channels AS c
LEFT JOIN videos AS v ON c.id = v.channel_id
LEFT JOIN video_ids AS vi ON c.id = vi.channel_id
LEFT JOIN youtubers AS Y ON c.id = y.id;

SELECT * FROM videos;

INSERT INTO videos (video_id, title, channel_id)
SELECT vi.video_id, vi.video_title, vi.channel_id
FROM video_ids vi
JOIN channels c ON vi.channel_id = c.id;

SELECT * FROM channels;

INSERT INTO channels (NAME) VALUES
('고기남자'),
('문츠'),
('정육왕'),
('육식맨'),
('승우아빠'),
('취요남');

INSERT INTO video_ids (video_id, video_title, channel_id) VALUES
('dBEzkrcniLg', '고기의 끝, 텍사스 브리스킷', 1),  -- '고기남자' 채널에 속하는 비디오
('fkV7U7jIgTA', '우대갈비의 끝', 1),
('q6DbnQOUnts', '풀드포크 바베큐는 집에서 하세요', 1),
('KXkOt0O4VnY', '평생 써먹는 통삼겹살 먹는 방법', 1),
('dEzMEjXSlgY', '삼겹살을 최대한 맛있게 먹는 법', 1),
('4rPYWgqtCCg', '1kg당 만원으로 배 터지게 먹는 바베큐', 2),  -- '문츠' 채널에 속하는 비디오
('8_2N90HRUBQ&t=327s', '텍사스 바베큐의 끝 브리스킷', 2),
('o6Bujt9RW3k', '텍사스바베큐 초급편 : 풀드포크', 2),
('F-dV6naR-7M', '캠핑 바베큐 무조건 성공하는 정육왕 루틴', 3),  -- '정육왕' 채널에 속하는 비디오
('WU2I6HZw26A', '정육왕의 펜션 숯불 바베큐 - 절대 실패하지 않는 법', 3),
('mdctnlkG-qI', '숯불 불쇼 안나는법 - 캠핑장 바베큐 [인생 꿀팁]', 3),
('1k2cGK9I97A', '번트엔즈 - 삼겹살 바베큐 탑 1티어 극강의 부드러움', 3),
('p69GYRLG7e0', '바베큐 스페어립 : 역대급 미친 가성비!', 4),  -- '육식맨' 채널에 속하는 비디오
('t9ugPGO3_RM', '고든램지 풀드포크 : 육즙 대폭발!', 4),
('QKiIG68aVqE&t=19s', '텍사스 브리스킷 : 이게 고기야, 푸딩이야!?!?', 4),
('sO2dCqcAabU', '텍사스 비프립 : 극대노 유발하는 소갈비 대장주!', 4),
('Fs5VhcSWKN8', '고든램지식 돼지갈비, 스페어립을 만들어 보았습니다', 5),  -- '승우아빠' 채널에 속하는 비디오
('mixRLgz3lcU', '텍사스 브리스킷을 집에서 만들어 보았습니다', 5),
('FMNL1B8Gniw', '세상 맛있는 통 오겹살 구이 3가지', 5),
('sl3L3U5k8XY', '당겨먹는 돼지고기 통바베큐', 5),
('6yNmBbyk3m8', '가족과 바베큐', 6),  -- '취요남' 채널에 속하는 비디오
('r5lRBvxIW9g', '집에서 하는 브리스킷 바베큐', 6),
('Q6v3Q7Vf5sU', '부채살 바베큐', 6),
('ZSLmwJBTfi4', 'SUB) 소갈비 바베큐!', 6);


select * from youtubers;

SELECT * FROM youtubers
where id = 1;

insert into youtubers
set `name` = '고기남자',
content_name = '제목1',
img_url = 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAxMTFfNTIg%2FMDAxNzA0OTQ0MjMxNzE2.Wbx2U8JUNvX8AMICUP1yhJTfAr6meUJ-GXAM5BT3Yccg.T1xkyO4diCOE95Tai073Fs153sYm0jNvTuUdKtGEjNog.JPEG.7hansollee%2Fgfgdfgdffg.JPG&type=sc960_832',
fullName = '박태영(고기남자)',
`body` = ' 대한민국 136만명의 구독자를 보유한 요리 유튜버 자신의 얼굴을 드러내지 않고 오직 목소리와
          손동작으로 고기 요리를 진행한다. 항상 자신의 전완근을 어필하는 독특한 영상 썸네일을
          지향한다./n/n[레시피 소개]/n고기의 끝, 텍사스 브리스킷/n우대갈비의 끝/n폴드포크 바베큐는 집에서 하세요/n평생 써먹는 통삼겹살 먹는 방법/n삼겹살을 최대한 맛있게 먹는 법'
          
          
INSERT INTO youtubers
SET `name` = '육식맨',
content_name = '제목2',
img_url = 'https://i.namu.wiki/i/nQJW2e_q6_y8kEDDoQQm-uqQxcp9kdpEt5GXcdPj5KFGiHLfz5OYnWztz2FYImuC-3S6lUxX7undv90l_8_jPg.webp',
fullName = '(육식맨)',
`body` = ' 대한민국 136만명의 구독자를 보유한 요리 유튜버 자신의 얼굴을 드러내지 않고 오직 목소리와
          손동작으로 고기 요리를 진행한다. 항상 자신의 전완근을 어필하는 독특한 영상 썸네일을
          지향한다./n/n[레시피 소개]/n고기의 끝, 텍사스 브리스킷/n우대갈비의 끝/n폴드포크 바베큐는 집에서 하세요/n평생 써먹는 통삼겹살 먹는 방법/n삼겹살을 최대한 맛있게 먹는 법'

INSERT INTO youtubers
SET `name` = '정육왕',
content_name = '제목3',
img_url = 'https://cdn.class101.net/images/ff5fbbb5-35a7-4fee-8540-35a0a120066e',
fullName = '박준건(정육왕)',
`body` = ' 대한민국 136만명의 구독자를 보유한 요리 유튜버 자신의 얼굴을 드러내지 않고 오직 목소리와
          손동작으로 고기 요리를 진행한다. 항상 자신의 전완근을 어필하는 독특한 영상 썸네일을
          지향한다./n/n[레시피 소개]/n고기의 끝, 텍사스 브리스킷/n우대갈비의 끝/n폴드포크 바베큐는 집에서 하세요/n평생 써먹는 통삼겹살 먹는 방법/n삼겹살을 최대한 맛있게 먹는 법'

INSERT INTO youtubers
SET `name` = '백종원',
content_name = '제목4',
img_url = 'https://dimg.donga.com/wps/NEWS/IMAGE/2018/10/23/92539689.2.jpg',
fullName = '(백종원)',
`body` = ' 대한민국 136만명의 구독자를 보유한 요리 유튜버 자신의 얼굴을 드러내지 않고 오직 목소리와
          손동작으로 고기 요리를 진행한다. 항상 자신의 전완근을 어필하는 독특한 영상 썸네일을
          지향한다./n/n[레시피 소개]/n고기의 끝, 텍사스 브리스킷/n우대갈비의 끝/n폴드포크 바베큐는 집에서 하세요/n평생 써먹는 통삼겹살 먹는 방법/n삼겹살을 최대한 맛있게 먹는 법'

INSERT INTO youtubers
SET `name` = '승우아빠',
content_name = '제목5',
img_url = 'https://i.namu.wiki/i/Xp4MMRlKcjkKf5CNoTmUcUjUL5VFfg9FvvWpT4U1XdXgSHqA1K5g2u3HT-n_3aJcsVufREe3GBTw3NBcUPab2g.webp',
fullName = '목진화(승우아빠)',
`body` = ' 대한민국 136만명의 구독자를 보유한 요리 유튜버 자신의 얼굴을 드러내지 않고 오직 목소리와
          손동작으로 고기 요리를 진행한다. 항상 자신의 전완근을 어필하는 독특한 영상 썸네일을
          지향한다./n/n[레시피 소개]/n고기의 끝, 텍사스 브리스킷/n우대갈비의 끝/n폴드포크 바베큐는 집에서 하세요/n평생 써먹는 통삼겹살 먹는 방법/n삼겹살을 최대한 맛있게 먹는 법'

INSERT INTO youtubers
SET `name` = '취요남',
content_name = '제목6',
img_url = 'https://i.namu.wiki/i/LWNmFEecKVs4e0rXZS52gnDvzSZ-PUfNh6zGZCD-1XCLR2bRRX-cpnUGv9KvqvaJLtPTDQPVfCkXgbdHGV0C4Nkr8-a8U-bfITZpgcmrmxPHFDPEQh7aFb-XYFQDo7uhlGmBq0nGJRCF7XAjOF-F3w.webp',
fullName = '노재형(취요남)',
`body` = ' 대한민국 136만명의 구독자를 보유한 요리 유튜버 자신의 얼굴을 드러내지 않고 오직 목소리와
          손동작으로 고기 요리를 진행한다. 항상 자신의 전완근을 어필하는 독특한 영상 썸네일을
          지향한다./n/n[레시피 소개]/n고기의 끝, 텍사스 브리스킷/n우대갈비의 끝/n폴드포크 바베큐는 집에서 하세요/n평생 써먹는 통삼겹살 먹는 방법/n삼겹살을 최대한 맛있게 먹는 법'

INSERT INTO youtubers
SET `name` = '문츠',
content_name = '제목7',
img_url = 'https://americanmeat.co.kr/wp-content/uploads/2020/09/USMEF_%EB%AC%B8%EC%B8%A0101%ED%81%B4%EB%A0%88%EC%8A%A4_img1-1024x1024.png',
fullName = '(문츠)',
`body` = ' 대한민국 136만명의 구독자를 보유한 요리 유튜버 자신의 얼굴을 드러내지 않고 오직 목소리와
          손동작으로 고기 요리를 진행한다. 항상 자신의 전완근을 어필하는 독특한 영상 썸네일을
          지향한다./n/n[레시피 소개]/n고기의 끝, 텍사스 브리스킷/n우대갈비의 끝/n폴드포크 바베큐는 집에서 하세요/n평생 써먹는 통삼겹살 먹는 방법/n삼겹살을 최대한 맛있게 먹는 법'

INSERT INTO article
SET title = '제목1',
content = '내용1'

INSERT INTO article
SET title = '제목2',
content = '내용2'

select * from article
SELECT * FROM products;