-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2018 at 12:52 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `resultats`;
DROP TABLE IF EXISTS `groups`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `users_session`;
DROP TABLE IF EXISTS `jocs`;
SET FOREIGN_KEY_CHECKS=1;

-- Grups d'usuaris
CREATE TABLE `groups` (
  `gid` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permissions` text COLLATE utf8mb4_unicode_ci NOT NULL,

  PRIMARY KEY (`gid`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `groups`
    MODIFY `gid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

INSERT INTO `groups` (`gid`, `name`, `permissions`) VALUES
(1, 'Usuari', ''),
(2, 'Administrador', '{\"admin\": 1,\r\n\"moderador\" :1}');

-- --------------------------------------------------------

-- Usuaris
CREATE TABLE `users` (
  `uid` int(11) NOT NULL,
  `username` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `joined` datetime NOT NULL,
  `groups` int(11) NOT NULL,

  PRIMARY KEY (`uid`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `users`
    MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000;

INSERT INTO users (`username`, `password`, `name`, `joined`, `groups`) VALUES ('$2y$10$sX/k19vToScBCQy1LUvw2e2.5iCOsbL3zb7CVni/M52Q2leXgONvO', 'ubaeza', 'Unai', '2022-04-19 17:02:07', 1);
INSERT INTO users (`username`, `password`, `name`, `joined`, `groups`) VALUES ('$2y$10$sX/k19vToScBCQy1LUvw2e2.5iCOsbL3zb7CVni/M52Q2leXgONvO', 'Baeza', 'Unai', '2022-04-23 22:33:22', 1);
INSERT INTO users (`username`, `password`, `name`, `joined`, `groups`) VALUES ('$2y$10$sX/k19vToScBCQy1LUvw2e2.5iCOsbL3zb7CVni/M52Q2leXgONvO', 'Baeza', 'Unai', '2022-04-24 09:42:27', 1);
INSERT INTO users (`username`, `password`, `name`, `joined`, `groups`) VALUES ('$2y$10$sX/k19vToScBCQy1LUvw2e2.5iCOsbL3zb7CVni/M52Q2leXgONvO', 'Baeza', 'Unai', '2022-04-25 20:06:51', 1);

-- Sessions usuaris
CREATE TABLE `users_session` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,

  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `users_session`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

-- Jocs
CREATE TABLE `jocs` (
  `jid` int(11) NOT NULL,
  `nom` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcio` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data_afegit` datetime NOT NULL,

  PRIMARY KEY (`jid`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `jocs`
    MODIFY `jid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

INSERT INTO jocs (`nom`, `img`, `descripcio`, `data_afegit`) VALUES ('A', 'a.png', 'Primer joc', '2022-04-19 17:02:07');
INSERT INTO jocs (`nom`, `img`, `descripcio`, `data_afegit`) VALUES ('B', 'b.png', 'Segon joc', '2022-04-27 12:05:30');
INSERT INTO jocs (`nom`, `img`, `descripcio`, `data_afegit`) VALUES ('C', 'c.png', 'Tercer joc', '2022-05-03 10:09:18');
INSERT INTO jocs (`nom`, `img`, `descripcio`, `data_afegit`) VALUES ('Proximament', 'proximament.jpg', '2022-05-03 20:37:02');
INSERT INTO jocs (`nom`, `img`, `descripcio`, `data_afegit`) VALUES ('Proximament', 'proximament.jpg', '2022-05-20 22:13:14');

-- Resultats
CREATE TABLE `resultats` (
                        `rid` int(11) NOT NULL,
                        `uid` int(11) NOT NULL,
                        `jid` int(11) NOT NULL,
                        `puntuacio` int(6) NOT NULL,
                        data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                        PRIMARY KEY (`rid`),
                        FOREIGN KEY (`uid`) REFERENCES `users`(`uid`) ON DELETE CASCADE,
                        FOREIGN KEY (`jid`) REFERENCES `jocs`(`jid`) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `resultats`
    MODIFY `rid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (1,1000,1500);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (2,1000,700);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (3,1000,300);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (3,1001,600);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (3,1001,750);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (3,1001,2200);


COMMIT;
