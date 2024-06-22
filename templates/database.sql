-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lms_oliv_v2
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `absensi`
--

DROP TABLE IF EXISTS `absensi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `absensi` (
  `id_absensi` int NOT NULL AUTO_INCREMENT,
  `waktu` date NOT NULL,
  `status` enum('On-Cam','Off-Cam','Izin','Alpha') DEFAULT NULL,
  `id_mentee` int NOT NULL,
  PRIMARY KEY (`id_absensi`),
  KEY `absensi_mentee_id_fk` (`id_mentee`),
  CONSTRAINT `absensi_mentee_id_fk` FOREIGN KEY (`id_mentee`) REFERENCES `mentee` (`id_mentee`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `absensi`
--

LOCK TABLES `absensi` WRITE;
/*!40000 ALTER TABLE `absensi` DISABLE KEYS */;
/*!40000 ALTER TABLE `absensi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mentee`
--

DROP TABLE IF EXISTS `mentee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mentee` (
  `id_mentee` int NOT NULL AUTO_INCREMENT,
  `phone_number` bigint NOT NULL,
  `name` varchar(50) NOT NULL,
  `nim` varchar(20) NOT NULL,
  `class` enum('A','B','C') NOT NULL,
  `session` enum('Pagi','Siang') NOT NULL,
  `category` tinyint NOT NULL,
  `major` varchar(50) NOT NULL,
  `id_user` int NOT NULL,
  `id_mentor` int NOT NULL,
  `id_university` int NOT NULL,
  PRIMARY KEY (`id_mentee`),
  UNIQUE KEY `mentee_pk` (`phone_number`),
  KEY `mentee_mentor_id_fk` (`id_mentor`),
  KEY `mentee_university_id_fk` (`id_university`),
  KEY `mentee_user_id_fk` (`id_user`),
  CONSTRAINT `mentee_mentor_id_fk` FOREIGN KEY (`id_mentor`) REFERENCES `mentor` (`id_mentor`),
  CONSTRAINT `mentee_university_id_fk` FOREIGN KEY (`id_university`) REFERENCES `university` (`id_university`),
  CONSTRAINT `mentee_user_id_fk` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mentee`
--

LOCK TABLES `mentee` WRITE;
/*!40000 ALTER TABLE `mentee` DISABLE KEYS */;
INSERT INTO `mentee` (`id_mentee`, `phone_number`, `name`, `nim`, `class`, `session`, `category`, `major`, `id_user`, `id_mentor`, `id_university`) VALUES (1,81234,'Kelvin','123456','A','Siang',1,'sistem informasi',1,1,1),(2,844756,'andi','77567','B','Pagi',0,'mekatronik',3,1,1);
/*!40000 ALTER TABLE `mentee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mentor`
--

DROP TABLE IF EXISTS `mentor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mentor` (
  `id_mentor` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) NOT NULL,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id_mentor`),
  KEY `mentor_user_id_fk` (`id_user`),
  CONSTRAINT `mentor_user_id_fk` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mentor`
--

LOCK TABLES `mentor` WRITE;
/*!40000 ALTER TABLE `mentor` DISABLE KEYS */;
INSERT INTO `mentor` (`id_mentor`, `nama`, `id_user`) VALUES (1,'olvia ristami',4);
/*!40000 ALTER TABLE `mentor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pengajuan`
--

DROP TABLE IF EXISTS `pengajuan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pengajuan` (
  `id_pengajuan` int NOT NULL AUTO_INCREMENT,
  `alasan` longtext NOT NULL,
  `tipe` enum('pengunduran diri','izin') NOT NULL,
  `lampiran` longtext,
  `date` date NOT NULL,
  `id_mentee` int NOT NULL,
  PRIMARY KEY (`id_pengajuan`),
  KEY `pengajuan_mentee_id_if` (`id_mentee`),
  CONSTRAINT `pengajuan_mentee_id_if` FOREIGN KEY (`id_mentee`) REFERENCES `mentee` (`id_mentee`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pengajuan`
--

LOCK TABLES `pengajuan` WRITE;
/*!40000 ALTER TABLE `pengajuan` DISABLE KEYS */;
INSERT INTO `pengajuan` (`id_pengajuan`, `alasan`, `tipe`, `lampiran`, `date`, `id_mentee`) VALUES (3,'ga ada waktu lagi','pengunduran diri',NULL,'2024-06-12',1);
/*!40000 ALTER TABLE `pengajuan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pengumpulan_tugas`
--

DROP TABLE IF EXISTS `pengumpulan_tugas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pengumpulan_tugas` (
  `id_pengumpulan` int NOT NULL AUTO_INCREMENT,
  `nilai` int NOT NULL,
  `lampiran` text,
  `id_tugas` int NOT NULL,
  `id_mentee` int NOT NULL,
  PRIMARY KEY (`id_pengumpulan`),
  KEY `pengumpulan_tugas_mentee_id_fk` (`id_mentee`),
  KEY `pengumpulan_tugas_tugas_id_fk` (`id_tugas`),
  CONSTRAINT `pengumpulan_tugas_mentee_id_fk` FOREIGN KEY (`id_mentee`) REFERENCES `mentee` (`id_mentee`),
  CONSTRAINT `pengumpulan_tugas_tugas_id_fk` FOREIGN KEY (`id_tugas`) REFERENCES `tugas` (`id_tugas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pengumpulan_tugas`
--

LOCK TABLES `pengumpulan_tugas` WRITE;
/*!40000 ALTER TABLE `pengumpulan_tugas` DISABLE KEYS */;
/*!40000 ALTER TABLE `pengumpulan_tugas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tugas`
--

DROP TABLE IF EXISTS `tugas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tugas` (
  `id_tugas` int NOT NULL AUTO_INCREMENT,
  `subyek` text NOT NULL,
  `batas_waktu` date NOT NULL,
  PRIMARY KEY (`id_tugas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tugas`
--

LOCK TABLES `tugas` WRITE;
/*!40000 ALTER TABLE `tugas` DISABLE KEYS */;
/*!40000 ALTER TABLE `tugas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `university`
--

DROP TABLE IF EXISTS `university`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `university` (
  `id_university` int NOT NULL AUTO_INCREMENT,
  `university_name` text NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `pic_name` varchar(50) NOT NULL,
  `pic_phone` bigint NOT NULL,
  `pic_email` varchar(50) NOT NULL,
  PRIMARY KEY (`id_university`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `university`
--

LOCK TABLES `university` WRITE;
/*!40000 ALTER TABLE `university` DISABLE KEYS */;
INSERT INTO `university` (`id_university`, `university_name`, `email`, `address`, `pic_name`, `pic_phone`, `pic_email`) VALUES (1,'institut teknologi batam','iteba@email.com','tiban','bapak 1',8111223,'bapak1@email.com');
/*!40000 ALTER TABLE `university` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `role` enum('admin','mentor','mentee') NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_pk` (`username`),
  UNIQUE KEY `user_pk2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `username`, `email`, `role`, `password`) VALUES (1,'kelvin','kelvin@email.com','mentee','1234'),(2,'test1','test1@email.com','admin','1234'),(3,'andi','andi@email.com','mentee','1234'),(4,'olivia','olivia@email.com','mentor','1234'),(5,'abdee','abdee@email.com','admin','1234'),(6,'bill','bill@email.com','mentor','1234');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-23  0:49:06
