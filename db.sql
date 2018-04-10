CREATE DATABASE website;
USE website;
CREATE TABLE blogs (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), body TEXT(1000), category VARCHAR(255), url VARCHAR(255));


INSERT INTO `blogs`(`title`, `body`, `category`, `url`) VALUES ('test title 1','test body 1','Lifestyle','http://mphtest.x10.bz');
INSERT INTO `blogs`(`title`, `body`, `category`, `url`) VALUES ('test title 2','test body 2','Lifestyle','http://mphtest.x10.bz');
INSERT INTO `blogs`(`title`, `body`, `category`, `url`) VALUES ('test title 3','test body 3','Video','http://mphtest.x10.bz');
INSERT INTO `blogs`(`title`, `body`, `category`, `url`) VALUES ('test title 4','test body 4','Travel','http://mphtest.x10.bz');