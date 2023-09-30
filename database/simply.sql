-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: simply_online
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.23.04.1

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


create database simply_online;

DROP TABLE IF EXISTS `attendance_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance_logs` (
  `attendance_log_id` int NOT NULL AUTO_INCREMENT,
  `attendance_id` int DEFAULT NULL,
  `user_name` varchar(255) NOT NULL,
  `room_name` varchar(255) NOT NULL,
  PRIMARY KEY (`attendance_log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance_table`
--

LOCK TABLES `attendance_table` WRITE;
/*!40000 ALTER TABLE `attendance_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendance_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passwords`
--

DROP TABLE IF EXISTS `passwords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passwords` (
  `password_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `password_hash` char(64) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`password_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `passwords_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passwords`
--

LOCK TABLES `passwords` WRITE;
/*!40000 ALTER TABLE `passwords` DISABLE KEYS */;
/*!40000 ALTER TABLE `passwords` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `salt` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'simply_online'
--

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
  
  
  SELECT COUNT(*), MAX(end_time) INTO room_count, room_end_time FROM simply_online.rooms WHERE room_name = p_room_name;
  
  IF room_count > 0 THEN
    
    IF room_end_time < CURRENT_TIMESTAMP THEN
      
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
/*!50003 DROP PROCEDURE IF EXISTS `create_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_user`(
    IN p_email VARCHAR(255),
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(64),
    IN p_password_rewrite VARCHAR(64)
)
BEGIN
    DECLARE v_salt VARCHAR(50);
    DECLARE v_user_count INT;
    DECLARE v_username_count INT;
   DECLARE v_password_length INT;
    DECLARE v_has_special CHAR(1);
    DECLARE v_has_number CHAR(1);
    DECLARE v_has_lowercase CHAR(1);
    DECLARE v_has_uppercase CHAR(1);
   
    -- Check if passwords match
    IF p_password <> p_password_rewrite THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Passwords do not match';
    END IF;
   
   -- Check if email is valid
    IF NOT (p_email REGEXP '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid email format';
    END IF;
   
   -- Password length validation
    SET v_password_length = LENGTH(p_password);
    IF LENGTH(p_password) < 8 OR LENGTH(p_password) > 30 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Password length should be between 8 and 30 characters';
    END IF;
    
    -- Password complexity validation
    SET v_has_special = (SELECT IF(p_password REGEXP '[!@#$%^&*(),.?":{}|<>]', 'Y', 'N'));
    SET v_has_number = (SELECT IF(p_password REGEXP '[0-9]', 'Y', 'N'));
    SET v_has_lowercase = (SELECT IF(p_password REGEXP '[a-z]', 'Y', 'N'));
    SET v_has_uppercase = (SELECT IF(p_password REGEXP '[A-Z]', 'Y', 'N'));
    
    IF v_has_special = 'N' OR v_has_number = 'N' OR v_has_lowercase = 'N' OR v_has_uppercase = 'N' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Password must contain at least one special character, one number, one lowercase letter, and one uppercase letter';
    END IF;
   
    -- Check if email already exists
    SELECT COUNT(*) INTO v_user_count
    FROM `user`
    WHERE `email` = p_email;
    IF v_user_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Email already exists';
    END IF;
    -- Generate a unique salt
    SET v_salt = UUID();
    -- Insert user into the user table
    INSERT INTO `user` (`email`, `username`, `salt`)
    VALUES (p_email, p_username, v_salt);
    -- Get the generated user_id
    SET @user_id = LAST_INSERT_ID();
    -- Hash and insert password into passwords table
    INSERT INTO `passwords` (`user_id`, `password_hash`)
    VALUES (@user_id, SHA2(CONCAT(v_salt, p_password), 256));
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
  
  
  SELECT room_id INTO roomid
  FROM simply_online.rooms
  WHERE room_name = p_room_name
    AND start_time <= CURRENT_TIMESTAMP
    AND end_time >= CURRENT_TIMESTAMP
    AND is_valid = true
  LIMIT 1;
  
  IF roomid IS NOT NULL THEN
    
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
/*!50003 DROP PROCEDURE IF EXISTS `verify_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `verify_user`(
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(64)
)
BEGIN
    DECLARE v_user_id INT;
    DECLARE v_username VARCHAR(50);
    DECLARE v_salt VARCHAR(256);
    DECLARE v_stored_password_hash CHAR(64);
    
    -- Get user info based on email
    SELECT `user_id`, `username`, `salt`
    INTO v_user_id, v_username, v_salt
    FROM `user`
    WHERE `email` = p_email;
    
    -- Check if user exists
    IF v_user_id IS NULL THEN
        SELECT FALSE AS user_found;
    ELSE
        -- Get stored password hash based on user_id
        SELECT `password_hash`
        INTO v_stored_password_hash
        FROM `passwords`
        WHERE `user_id` = v_user_id;
        
        -- Concatenate salt and password, then hash
        SET @hashed_password = SHA2(CONCAT(v_salt, p_password), 256);
        
        -- Compare hashed passwords
        IF @hashed_password = v_stored_password_hash THEN
            SELECT TRUE AS user_found, p_email AS email, v_username AS username, v_user_id AS user_id;
        ELSE
            SELECT FALSE AS user_found;
        END IF;
    END IF;
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

-- Dump completed on 2023-09-19  9:41:01
