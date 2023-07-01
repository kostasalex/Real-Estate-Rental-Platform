-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: rentspot_db
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `address` varchar(45) DEFAULT NULL,
  `register_date` date NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `host_application` tinyint NOT NULL DEFAULT '0' COMMENT '- 0 he is just seeking for apartments\n- 1 has application for host pending \n- 2 he has application accepted and he is host.',
  `image_url` varchar(300) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5689 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'example@example.com','password123','123 Example St','2023-06-22',0,1,'https://dummyimage.com/100x100/000000/ffffff.jpg','k','sa',NULL,NULL),(1234,'user@example.com','password123','123 Example St','2023-06-22',0,1,'https://dummyimage.com/100x100/000000/ffffff.jpg','k','sa',NULL,NULL),(5678,'user2@example.com','password456','456 Example St','2023-06-22',0,1,'https://dummyimage.com/100x100/000000/ffffff.jpg','k','sa',NULL,NULL),(5679,'johnsnow@example.com','ASD1a',NULL,'2023-06-28',0,0,NULL,NULL,NULL,NULL,NULL),(5680,'johnsnow@example.com','ASD1a',NULL,'2023-06-28',0,0,NULL,NULL,NULL,NULL,NULL),(5681,'johnsnow@example.com','ASD1a',NULL,'2023-06-28',0,0,NULL,NULL,NULL,NULL,NULL),(5682,'johnsnow@example.com','ASD1a',NULL,'2023-06-28',0,0,NULL,NULL,NULL,NULL,NULL),(5683,'johnsnow@example.com','ASD1a',NULL,'2023-06-29',0,0,NULL,NULL,NULL,NULL,NULL),(5684,'johnsnow@example.com','ASD1a',NULL,'2023-06-29',0,0,NULL,NULL,NULL,NULL,NULL),(5685,'johnsnow@example.com','ASD1a',NULL,'2023-06-29',0,0,NULL,NULL,NULL,NULL,NULL),(5686,'johnsnow@example.com','ASD1a',NULL,'2023-06-29',0,0,NULL,NULL,NULL,NULL,NULL),(5687,'johnsnow@example.com','ASD1a',NULL,'2023-06-29',0,0,NULL,NULL,NULL,NULL,NULL),(5688,'johnsnow@example.com','ASD1a',NULL,'2023-07-01',0,0,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-01 21:37:07
