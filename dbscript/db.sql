CREATE DATABASE football;

CREATE TABLE IF NOT EXISTS `teams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task` varchar(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
);

ALTER TABLE `tasks` ADD PRIMARY KEY (`id`);
ALTER TABLE `users` ADD PRIMARY KEY (`id`);

INSERT INTO `users` (`id`,`username`,`password`) values (1,'user1','pass1');
INSERT INTO `users` (`id`,`username`,`password`) values (2,'user2','pass2');
