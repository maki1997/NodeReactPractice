CREATE DATABASE football;

CREATE TABLE IF NOT EXISTS teams (
  `id` int NOT NULL primary key auto_increment,
  `team` varchar(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  `id` int NOT NULL primary key auto_increment,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL
);

INSERT INTO `teams` (`id`,`team`) values (1,'Crvena Zvezda');
INSERT INTO `teams` (`id`,`team`) values (2,'Swansea');

INSERT INTO `users` (`id`,`username`,`password`) values (1,'user1','pass1');
INSERT INTO `users` (`id`,`username`,`password`) values (2,'user2','pass2');
