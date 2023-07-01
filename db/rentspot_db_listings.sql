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
-- Table structure for table `listings`
--

DROP TABLE IF EXISTS `listings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `thumbnail_url` varchar(400) DEFAULT NULL,
  `medium_url` varchar(400) DEFAULT NULL,
  `price` float NOT NULL,
  `accommodates` varchar(45) DEFAULT NULL,
  `bathrooms` int DEFAULT NULL,
  `bedrooms` int NOT NULL,
  `bed_type` varchar(50) DEFAULT NULL,
  `number_of_reviews` int DEFAULT NULL,
  `review_scores_rating` float DEFAULT NULL,
  `street` varchar(45) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `longitude` float NOT NULL,
  `latitude` float NOT NULL,
  `amenities` varchar(300) DEFAULT NULL,
  `users_id` int NOT NULL,
  `beds` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `host_name` varchar(255) DEFAULT NULL,
  `host_picture_url` varchar(255) DEFAULT NULL,
  `host_since` date DEFAULT NULL,
  `host_location` varchar(255) DEFAULT NULL,
  `host_about` text,
  `host_response_time` varchar(255) DEFAULT NULL,
  `host_response_rate` decimal(10,2) DEFAULT NULL,
  `host_listings_count` int DEFAULT NULL,
  `room_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`users_id`),
  KEY `fk_listings_users1_idx` (`users_id`),
  CONSTRAINT `fk_listings_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1286211 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listings`
--

LOCK TABLES `listings` WRITE;
/*!40000 ALTER TABLE `listings` DISABLE KEYS */;
INSERT INTO `listings` VALUES (1,'https://dummyimage.com/300x200/000000/ffffff.jpg&text=Thumbnail+1','https://dummyimage.com/800x600/000000/ffffff.jpg&text=Medium+1',100,'2',2,1,'1',10,4,'Dummy Street 1','Dummy description 1',1.2345,2.3456,'WiFi, Parking',1234,2,'Dummy Name 1','Host Name 1','https://dummyimage.com/100x100/000000/ffffff.jpg&text=Host+Picture+1','2022-01-01','Dummy Location 1','About host 1','Response time 1',95.50,5,NULL),(2,'https://dummyimage.com/300x200/000000/ffffff.jpg&text=Thumbnail+2','https://dummyimage.com/800x600/000000/ffffff.jpg&text=Medium+2',150,'4',3,2,'Double',15,4,'Dummy Street 2','Dummy description 2',3.4567,4.5678,'WiFi, Pool',5678,3,'Dummy Name 2','Host Name 2','https://dummyimage.com/100x100/000000/ffffff.jpg&text=Host+Picture+2','2022-02-01','Dummy Location 2','About host 2','Response time 2',90.00,8,NULL),(1108690,'https://a0.muscache.com/ac/pictures/19034905/6982ee6c_original.jpg?interpolation=lanczos-none&size=small&output-format=jpg&output-quality=70','https://a0.muscache.com/ac/pictures/19034905/6982ee6c_original.jpg?interpolation=lanczos-none&size=medium&output-format=jpg&output-quality=70',42,'2',1,1,'Real Bed',189,86,'Chatzichristou, Athens, Attica 117 42, Greece','Sunny & Quiet apartment at the first floor in a beauty full building. Just 100 meters from Acropolis & 30 meters from the Acropolis Musuem. Bedroom with double futon bed, a kitchen, wireless internet, landline and a confortable bathroom. The flat is able to host up to 3 accommodates. Alll this just around the corner of the new Acropolis musuem.that leads to Plaka Area,Irodeion theatre and Thision. Plaka is the area under the stone hill of Acropolis full with restaurants which serve delicious traditional food. Erodeion is an ancient greek theatre where concerts and theater performances taking place. Thision area is also very close to the apartment.Thision is well known for its bars and restaurants.What is more, the area is very well connected not only with the center of the town but also with the sea. Metro Acropolis is only ! 50 meters from the flat.Buses and tram are also very close. If you have any questions,do not hesitate to contact me.',23.729,37.9689,'{Internet,\"Wireless Internet\",\"Air Conditioning\",Kitchen,\"Elevator in Building\",Heating,\"Family/Kid Friendly\",Essentials,Shampoo}',1,1,'Just 200m from Acropolis, Athens','Ektoras','https://a1.muscache.com/ac/users/2436598/profile_pic/1384177608/original.jpg?interpolation=lanczos-none&crop=w:w;*,*&crop=h:h;*,*&resize=225:*&output-format=jpg&output-quality=70','2012-05-22','Athens, Attica, Greece','I love music, shadow, sea , sports & the theater.\r\n\r\n','within an hour',0.95,2,'Entire home/apt'),(1286210,'https://a1.muscache.com/ac/pictures/19389554/a2ff7ebf_original.jpg?interpolation=lanczos-none&size=small&output-format=jpg&output-quality=70','https://a1.muscache.com/ac/pictures/19389554/a2ff7ebf_original.jpg?interpolation=lanczos-none&size=medium&output-format=jpg&output-quality=70',48,'2',1,1,'Real Bed',4,100,'Vatheos, Athens, Attica 115 22, Greece','JUST REFURBISHED - BRAND NEW APARTMENT. Very earthly energy. It is situated on the ground floor of a building. So...a zen apartment near the center of Athens. It is situated only fourty minutes from Athens airport by metro (no change is required). Once you get off at the metro stop Ambelokipi, you walk  minutes and voila!!! Three metro stops more and you will find yourselves in the center of Athens.  Back to zen.....it is a one bedroom apartment with a small dinning room and a living room.  The main glass wall provides a unique lighting throughout the day. At night the street light gives an overall warm glow to the space. A kitchen door leads to a small courtyard. At night the courtyard lights give a depth to the entire space. There is a mini market open from 10am to 12 midnight which can accommodate all your needs. There is also an excellent restaurant nearby where one can enjoy a fine lunch or a relaxing dinner. A less pricy restaurant is situated just across the street.',23.7589,37.99,'{\"Wireless Internet\",Kitchen,\"Pets Allowed\",Heating,\"Family/Kid Friendly\",Washer}',5687,1,'Zen space near center of Athens','Peter','https://a2.muscache.com/ac/users/372161/profile_pic/1296594728/original.jpg?interpolation=lanczos-none&crop=w:w;*,*&crop=h:h;*,*&resize=225:*&output-format=jpg&output-quality=70','2011-02-01','Athens, Attica, Greece','Filmmaker and musician who loves to walk Athens. Currently enjoying a hot summer after a demanding short film. Please visit my website to know more about me.\n(website hidden)','a few days or more',0.33,1,'Entire home/apt');
/*!40000 ALTER TABLE `listings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-01 21:37:08
