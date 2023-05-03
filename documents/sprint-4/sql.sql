CREATE DATABASE  IF NOT EXISTS `simply_online` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `simply_online`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: simply_online
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance_logs`
--

DROP TABLE IF EXISTS `attendance_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance_logs` (
  `attendance_log_id` int NOT NULL AUTO_INCREMENT,
  `attendance_id` int DEFAULT NULL,
  `user_name` varchar(255) NOT NULL,
  `room_name` varchar(255) NOT NULL,
  PRIMARY KEY (`attendance_log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance_logs`
--

LOCK TABLES `attendance_logs` WRITE;
/*!40000 ALTER TABLE `attendance_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendance_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance_table`
--

DROP TABLE IF EXISTS `attendance_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner_name` varchar(255) NOT NULL,
  `room_name` varchar(255) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance_table`
--

LOCK TABLES `attendance_table` WRITE;
/*!40000 ALTER TABLE `attendance_table` DISABLE KEYS */;
INSERT INTO `attendance_table` VALUES (100000,'test','test','2023-04-29 15:04:04');
/*!40000 ALTER TABLE `attendance_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `room_id` int unsigned NOT NULL AUTO_INCREMENT,
  `owner_name` varchar(255) NOT NULL,
  `room_name` varchar(255) DEFAULT '',
  `room_description` text,
  `start_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` datetime NOT NULL DEFAULT ((now() + interval 1 day)),
  `max_capacity` int unsigned DEFAULT '100',
  `current_capacity` int unsigned DEFAULT '0',
  `room_password` varchar(255) DEFAULT '',
  `is_locked` tinyint(1) NOT NULL DEFAULT '0',
  `is_public` tinyint(1) NOT NULL DEFAULT '1',
  `room_type` varchar(50) DEFAULT '',
  `is_valid` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100013 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (100001,'bharath','room1','','2023-04-23 20:09:52','2023-04-24 20:09:52',100,0,'',0,1,'',1),(100002,'bharath','room2','','2023-04-23 20:35:21','2023-04-24 20:35:21',100,0,'',0,1,'',1),(100003,'bharath','room3','','2023-04-23 20:52:11','2023-04-24 20:52:11',100,0,'',0,1,'',1),(100004,'bharath','room4','','2023-04-23 20:52:42','2023-04-24 20:52:42',100,0,'',0,1,'',1),(100005,'bharath','test','','2023-04-23 21:11:06','2023-04-24 21:11:06',100,0,'',0,1,'',1),(100006,'asdf','asdf','','2023-04-23 21:44:30','2023-04-24 21:44:30',100,0,'',0,1,'',1),(100007,'asdf','adsf','','2023-04-23 21:48:50','2023-04-24 21:48:50',100,0,'',0,1,'',1),(100008,'asdf','asdfa','','2023-04-23 21:49:21','2023-04-24 21:49:21',100,0,'',0,1,'',1),(100009,'asdf','asdfa1','','2023-04-23 22:00:49','2023-04-24 22:00:49',100,0,'',0,1,'',1),(100010,'test','test','','2023-04-29 16:28:23','2023-04-30 16:28:23',100,0,'',0,1,'',1),(100011,'test','test21','','2023-04-29 17:20:50','2023-04-30 17:20:50',100,0,'',0,1,'',1),(100012,'test212','test212','','2023-04-29 18:36:47','2023-04-30 18:36:47',100,0,'',0,1,'',1);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'simply_online'
--
/*!50003 DROP PROCEDURE IF EXISTS `add_attendance_log` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_attendance_log`(
    IN p_attendance_id INT,
    IN p_user_name VARCHAR(255),
    IN p_room_name VARCHAR(255)
)
BEGIN
    INSERT INTO attendance_logs (attendance_id, user_name, room_name)
    VALUES (p_attendance_id, p_user_name, p_room_name);
    
    SELECT * FROM attendance_logs WHERE attendance_log_id = LAST_INSERT_ID();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_room` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_room`(
  IN p_room_name VARCHAR(255),
  IN p_owner_name VARCHAR(255),
  IN p_room_description TEXT,
  IN p_start_time DATETIME,
  IN p_end_time DATETIME,
  IN p_max_capacity INT UNSIGNED,
  IN p_room_password VARCHAR(255),
  IN p_is_locked BOOL,
  IN p_is_public BOOL,
  IN p_room_type VARCHAR(50)
)
BEGIN
  DECLARE room_count INT UNSIGNED;
  DECLARE room_end_time DATETIME;
  
  -- check if the room name already exists
  SELECT COUNT(*), MAX(end_time) INTO room_count, room_end_time FROM simply_online.rooms WHERE room_name = p_room_name;
  
  IF room_count > 0 THEN
    -- check if the end time of the existing room is less than the current time
    IF room_end_time < CURRENT_TIMESTAMP THEN
      -- insert the new room into the database
      INSERT INTO simply_online.rooms (
        owner_name,
        room_name,
        room_description,
        start_time,
        end_time,
        max_capacity,
        room_password,
        is_locked,
        is_public,
        room_type
      ) VALUES (
        p_owner_name,
        p_room_name,
        COALESCE(p_room_description, ''),
        COALESCE(p_start_time, CURRENT_TIMESTAMP),
        COALESCE(p_end_time, CURRENT_TIMESTAMP + INTERVAL 1 DAY),
        COALESCE(p_max_capacity, 100),
        COALESCE(p_room_password, ''),
        COALESCE(p_is_locked, FALSE),
        COALESCE(p_is_public, TRUE),
        COALESCE(p_room_type, '')
      );
    
      SELECT 'Room created successfully.' AS message;
    ELSE
      SELECT 'Room with the same name already exists.' AS message;
    END IF;
  ELSE
    -- insert the new room into the database
    INSERT INTO simply_online.rooms (
      owner_name,
      room_name,
      room_description,
      start_time,
      end_time,
      max_capacity,
      room_password,
      is_locked,
      is_public,
      room_type
    ) VALUES (
      p_owner_name,
      p_room_name,
      COALESCE(p_room_description, ''),
      COALESCE(p_start_time, CURRENT_TIMESTAMP),
      COALESCE(p_end_time, CURRENT_TIMESTAMP + INTERVAL 1 DAY),
      COALESCE(p_max_capacity, 100),
      COALESCE(p_room_password, ''),
      COALESCE(p_is_locked, FALSE),
      COALESCE(p_is_public, TRUE),
      COALESCE(p_room_type, '')
    );
    
    SELECT 'Room created successfully.' AS message;
  END IF;
  
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_attendance_logs` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_attendance_logs`(
  IN p_attendance_id INT
)
BEGIN
  SELECT * FROM attendance_logs WHERE attendance_id = p_attendance_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_latest_attendance_record` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_latest_attendance_record`(
  IN room_name VARCHAR(255)
)
BEGIN
  SELECT *
  FROM attendance_table
  WHERE room_name = room_name
  ORDER BY created_timestamp DESC
  LIMIT 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_room_details` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_room_details`(
  IN p_room_name VARCHAR(255)
)
BEGIN
  DECLARE roomid INT UNSIGNED;
  
  -- check if the room exists and is currently available
  SELECT room_id INTO roomid
  FROM simply_online.rooms
  WHERE room_name = p_room_name
    AND start_time <= CURRENT_TIMESTAMP
    AND end_time >= CURRENT_TIMESTAMP
    AND is_valid = true
  LIMIT 1;
  
  IF roomid IS NOT NULL THEN
    -- get room details
    SELECT *
    FROM simply_online.rooms
    WHERE room_id = roomid;
  ELSE
    SELECT 'Room does not exist or is not currently available.' AS message;
  END IF;
  
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_attendance_table` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_attendance_table`(
  IN owner_name VARCHAR(255),
  IN room_name VARCHAR(255)
)
BEGIN
  INSERT INTO attendance_table (owner_name, room_name)
  VALUES (owner_name, room_name);

  SELECT *
  FROM attendance_table
  WHERE id = LAST_INSERT_ID();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-29 21:12:06
