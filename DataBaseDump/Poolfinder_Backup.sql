-- MySQL dump 10.13  Distrib 9.4.0, for macos15 (arm64)
--
-- Host: localhost    Database: LostAndFound
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category` (
  `id` varchar(10) NOT NULL,
  `categoryName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES ('1','Electronics'),('2','Personal Care'),('3','Toys'),('4','Clothing'),('5','Containers');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LostItems`
--

DROP TABLE IF EXISTS `LostItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LostItems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `itemName` varchar(45) DEFAULT NULL,
  `categoryId` varchar(10) DEFAULT NULL,
  `itemDescription` varchar(45) DEFAULT NULL,
  `itemLocation` varchar(45) DEFAULT NULL,
  `dateFound` datetime DEFAULT NULL,
  `itemUpload` blob,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `contactInfo` varchar(90) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `descId_idx` (`categoryId`),
  CONSTRAINT `descId` FOREIGN KEY (`categoryId`) REFERENCES `Category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LostItems`
--

LOCK TABLES `LostItems` WRITE;
/*!40000 ALTER TABLE `LostItems` DISABLE KEYS */;
/*!40000 ALTER TABLE `LostItems` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-01 15:07:42

CREATE TABLE `LostAndFound`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `firstName` VARCHAR(45) NULL,
  `lastName` VARCHAR(45) NULL,
  `lastLogin` DATETIME NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `LostAndFound`.`LostItems` 
ADD COLUMN `phoneNumber` VARCHAR(15) NULL AFTER `emailAdress`,
ADD COLUMN `itemClaimed` TINYINT NOT NULL DEFAULT 0 AFTER `phoneNumber`,
ADD COLUMN `lastUpdated` DATETIME NULL AFTER `itemClaimed`,
ADD COLUMN `lastUpdatedBy` VARCHAR(45) NULL AFTER `lastUpdated`,
ADD COLUMN `claimantName` VARCHAR(50) NULL AFTER `lastUpdatedBy`,
ADD COLUMN `claimantPhone` VARCHAR(15) NULL AFTER `claimantName`,
ADD COLUMN `claimantEmail` VARCHAR(45) NULL AFTER `claimantPhone`,
CHANGE COLUMN `firstName` `firstName` VARCHAR(45) NOT NULL ,
CHANGE COLUMN `lastName` `lastName` VARCHAR(45) NOT NULL ,
CHANGE COLUMN `contactInfo` `emailAdress` VARCHAR(90) NULL ;

INSERT INTO Category VALUES ("6", "Other");

ALTER TABLE `LostAndFound`.`LostItems` 
CHANGE COLUMN `emailAdress` `emailAddress` VARCHAR(90) NULL DEFAULT NULL ,
CHANGE COLUMN `phoneNumber` `phoneNumber` VARCHAR(15) NULL ;

CREATE TABLE `LostAndFound`.`Claims` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `itemId` VARCHAR(45) NULL,
  `intention` VARCHAR(45) NULL,
  `dateLastSeen` DATETIME NULL,
  `claimscol` VARCHAR(45) NULL,
  `studentId` VARCHAR(45) NULL,
  `firstName` VARCHAR(45) NULL,
  `lastName` VARCHAR(45) NULL,
  `schoolEmail` VARCHAR(45) NULL,
  `itemName` VARCHAR(45) NULL,
  `itemColor` VARCHAR(45) NULL,
  `locationLost` VARCHAR(45) NULL,
  `distinctiveFeatures` VARCHAR(45) NULL,
  `proofImage` BLOB NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `LostAndFound`.`Claims` 
DROP COLUMN `claimscol`;

CREATE TABLE `LostAndFound`.`Inquiries` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `itemid` VARCHAR(45) NULL,
  `internalMarkings` VARCHAR(45) NULL,
  `itemContents` VARCHAR(45) NULL,
  `uniqueDamage` VARCHAR(45) NULL,
  `digitalDetails` VARCHAR(45) NULL,
  `hiddenFeatures` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `LostAndFound`.`Claims` 
CHANGE COLUMN `itemId` `itemId` INT NULL DEFAULT NULL ;

ALTER TABLE `LostAndFound`.`LostItems` 
CHANGE COLUMN `itemUpload` `itemUpload` LONGBLOB NULL DEFAULT NULL ;

ALTER TABLE `lostandfound`.`claims` 
CHANGE COLUMN `proofImage` `proofImage` LONGBLOB NULL DEFAULT NULL ;
