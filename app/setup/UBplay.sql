-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2018 at 12:52 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.10

-- CREATE DATABASE IF NOT EXISTS ubplay DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- USE ubplay;
-- USE id18817314_ubplay;

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
  `p_dia` int(10) DEFAULT 0,
  `p_setmana` int(10) DEFAULT 0,
  `p_mes` int(10) DEFAULT 0,
  `p_any` int(10) DEFAULT 0,
  `p_total` int(10) DEFAULT 0,

  PRIMARY KEY (`uid`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `users`
    MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000;

INSERT INTO users (`username`, `password`, `name`, `joined`, `groups`) VALUES ('ubaeza', '$2y$10$sX/k19vToScBCQy1LUvw2e2.5iCOsbL3zb7CVni/M52Q2leXgONvO', 'Unai', '2022-04-19 17:02:07', 1);
INSERT INTO users (`username`, `password`, `name`, `joined`, `groups`) VALUES ('maria99', '$2y$10$xoWUUcT92LR54EZCPzUm8O1EJDyM.Q9tymTxpVoQdT1QK0JINBHBS', 'Maria', '2022-04-23 22:33:22', 1);
INSERT INTO users (`username`, `password`, `name`, `joined`, `groups`) VALUES ('ttomas', '$2y$10$xoWUUcT92LR54EZCPzUm8O1EJDyM.Q9tymTxpVoQdT1QK0JINBHBS', 'Tomàs', '2022-04-24 09:42:27', 1);
INSERT INTO users (`username`, `password`, `name`, `joined`, `groups`) VALUES ('ppuig', '$2y$10$xoWUUcT92LR54EZCPzUm8O1EJDyM.Q9tymTxpVoQdT1QK0JINBHBS', 'Tomàs', '2022-04-24 09:42:27', 1);
INSERT INTO users (`username`, `password`, `name`, `joined`, `groups`) VALUES ('ruiz94', '$2y$10$xoWUUcT92LR54EZCPzUm8O1EJDyM.Q9tymTxpVoQdT1QK0JINBHBS', 'Tomàs', '2022-04-24 09:42:27', 1);
INSERT INTO users (`username`, `password`, `name`, `joined`, `groups`) VALUES ('ferf06', '$2y$10$xoWUUcT92LR54EZCPzUm8O1EJDyM.Q9tymTxpVoQdT1QK0JINBHBS', 'Tomàs', '2022-04-24 09:42:27', 1);
INSERT INTO users (`username`, `password`, `name`, `joined`, `groups`) VALUES ('robocop', '$2y$10$xoWUUcT92LR54EZCPzUm8O1EJDyM.Q9tymTxpVoQdT1QK0JINBHBS', 'Tomàs', '2022-04-24 09:42:27', 1);
INSERT INTO users (`username`, `password`, `name`, `joined`, `groups`) VALUES ('eloi23', '$2y$10$xoWUUcT92LR54EZCPzUm8O1EJDyM.Q9tymTxpVoQdT1QK0JINBHBS', 'Tomàs', '2022-04-24 09:42:27', 1);
INSERT INTO users (`username`, `password`, `name`, `joined`, `groups`) VALUES ('jordil', '$2y$10$xoWUUcT92LR54EZCPzUm8O1EJDyM.Q9tymTxpVoQdT1QK0JINBHBS', 'Tomàs', '2022-04-24 09:42:27', 1);
INSERT INTO users (`username`, `password`, `name`, `joined`, `groups`) VALUES ('cgomez', '$2y$10$xoWUUcT92LR54EZCPzUm8O1EJDyM.Q9tymTxpVoQdT1QK0JINBHBS', 'Tomàs', '2022-04-24 09:42:27', 1);

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
  `nom` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ruta` varchar(100) COLLATE utf8mb4_unicode_ci,
  `descripcio` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  actiu boolean NOT NULL DEFAULT 0,
  `cops_jugat` int(11) NOT NULL,
  `data_afegit` datetime NOT NULL,

  PRIMARY KEY (`jid`)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `jocs`
    MODIFY `jid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

INSERT INTO jocs (`nom`, `ruta`, `descripcio`, `data_afegit`, `actiu`) VALUES ('Space Invaders', 'marcianitos.php', 'Elimina a totes les naus alienígenes!', '2022-04-19 17:02:07', 1);
INSERT INTO jocs (`nom`, `ruta`, `descripcio`, `data_afegit`) VALUES ('Horace & The Spiders', 'horace-spiders.php', 'Avança per les plataformes!', '2022-04-27 12:05:30');
INSERT INTO jocs (`nom`, `ruta`, `descripcio`, `data_afegit`) VALUES ('Pacman', 'pacman.php', 'Consegueix el màxim de punts sense que t''atrapin els fantasmes!', '2022-05-03 10:09:18');
INSERT INTO jocs (`nom`, `ruta`, `descripcio`, `data_afegit`) VALUES ('Breakout', 'breakout.php', 'Trenca tots els maons!', '2022-05-03 20:37:02');
INSERT INTO jocs (`nom`, `ruta`, `descripcio`, `data_afegit`) VALUES ('Snake', 'snake.php', 'Consegueix tots els punts sense xocar!', '2022-05-20 22:13:14');

-- Resultats
CREATE TABLE `resultats` (
                        `rid` int(11) NOT NULL,
                        `uid` int(11) NOT NULL,
                        `jid` int(11) NOT NULL,
                        `puntuacio` int(10) NOT NULL,
                        data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                        PRIMARY KEY (`rid`),
                        FOREIGN KEY (`uid`) REFERENCES `users`(`uid`) ON DELETE CASCADE,
                        FOREIGN KEY (`jid`) REFERENCES `jocs`(`jid`) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `resultats`
    MODIFY `rid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

-- Trigger incrementar puntuacions dinamicament
DELIMITER $$

CREATE OR REPLACE TRIGGER `puntuacio_dinamica`
AFTER INSERT ON resultats
FOR EACH ROW
BEGIN

UPDATE users
SET p_dia = p_dia + new.puntuacio
WHERE users.uid = new.uid;

UPDATE users
SET p_setmana = p_setmana + new.puntuacio
WHERE users.uid = new.uid;

UPDATE users
SET p_mes = p_mes + new.puntuacio
WHERE users.uid = new.uid;

UPDATE users
SET p_any = p_any + new.puntuacio
WHERE users.uid = new.uid;

UPDATE users
SET p_total = p_total + new.puntuacio
WHERE users.uid = new.uid;

UPDATE jocs
SET cops_jugat = cops_jugat + 1
WHERE jocs.jid = new.jid;

END$$

DELIMITER ;

INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (1,1000,1500);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (2,1000,700);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (1,1001,300);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (2,1001,645);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (1,1002,275);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (2,1002,2350);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (1,1003,300);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (2,1003,630);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (1,1004,625);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (2,1004,750);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (1,1005,2200);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (1,1005,320);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (2,1006,675);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (1,1006,250);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (2,1007,2200);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (1,1007,600);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (2,1008,680);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (1,1008,950);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (2,1004,750);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (1,1001,1200);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (1,1008,980);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (1,1009,3500);
INSERT INTO resultats (`jid`, `uid`, `puntuacio`) VALUES (1,1009,1200);

-- Events puntuacions
CREATE OR REPLACE EVENT `reset_puntuacio_dia`
ON SCHEDULE
	EVERY 1 DAY
    STARTS (TIMESTAMP(CURRENT_DATE) + INTERVAL 1 DAY)
DO
UPDATE users SET p_dia = 0;

CREATE OR REPLACE EVENT `reset_puntuacio_setmana`
ON SCHEDULE
	EVERY 1 WEEK
    STARTS (TIMESTAMP(CURRENT_DATE) + INTERVAL 1 WEEK)
DO
UPDATE users SET p_setmana = 0;

CREATE OR REPLACE EVENT `reset_puntuacio_mes`
ON SCHEDULE
	EVERY 1 MONTH
    STARTS (TIMESTAMP(CURRENT_DATE) + INTERVAL 1 MONTH)
DO
UPDATE users SET p_mes = 0;

CREATE OR REPLACE EVENT `reset_puntuacio_any`
ON SCHEDULE
	EVERY 1 YEAR
    STARTS (TIMESTAMP(CURRENT_DATE) + INTERVAL 1 YEAR)
DO
UPDATE users SET p_any = 0;

COMMIT;
