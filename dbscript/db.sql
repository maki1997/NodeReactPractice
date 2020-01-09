CREATE DATABASE football;

CREATE TABLE IF NOT EXISTS `teams` (
  `id` int NOT NULL,
  `task` varchar(200) NOT NULL
);

ALTER TABLE `tasks` ADD PRIMARY KEY (`id`);
ALTER TABLE `tasks` MODIFY `id` int NOT NULL ;
