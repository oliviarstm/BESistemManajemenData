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
  `status` tinyint DEFAULT NULL,
  `id_mentee` int NOT NULL,
  PRIMARY KEY (`id_absensi`),
  KEY `absensi_mentee_id_fk` (`id_mentee`),
  CONSTRAINT `absensi_mentee_id_fk` FOREIGN KEY (`id_mentee`) REFERENCES `mentee` (`id_mentee`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=355 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `absensi`
--

LOCK TABLES `absensi` WRITE;
/*!40000 ALTER TABLE `absensi` DISABLE KEYS */;
INSERT INTO `absensi` (`id_absensi`, `waktu`, `status`, `id_mentee`) VALUES (301,'2024-10-26',0,1),(302,'2024-10-26',1,2),(303,'2024-10-26',0,4),(304,'2024-10-26',1,5),(306,'2024-10-26',1,3),(307,'2024-10-26',0,6),(308,'2024-10-24',0,1),(309,'2024-10-24',1,2),(310,'2024-10-24',1,4),(311,'2024-10-24',0,5),(313,'2024-10-24',1,3),(314,'2024-10-24',0,6),(329,'2024-11-01',0,1),(330,'2024-11-01',0,2),(331,'2024-11-01',0,4),(332,'2024-11-01',0,5),(334,'2024-11-01',0,3),(335,'2024-11-01',0,6),(336,'2024-10-31',1,1),(337,'2024-10-31',1,2),(338,'2024-10-31',1,4),(339,'2024-10-31',0,5),(341,'2024-10-31',0,3),(342,'2024-10-31',0,6),(343,'2024-10-30',0,1),(344,'2024-10-30',0,2),(345,'2024-10-30',0,4),(346,'2024-10-30',0,5),(347,'2024-10-30',0,3),(348,'2024-10-30',0,6),(349,'2024-10-29',0,1),(350,'2024-10-29',0,2),(351,'2024-10-29',0,4),(352,'2024-10-29',0,5),(353,'2024-10-29',0,3),(354,'2024-10-29',0,6);
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
  CONSTRAINT `mentee_mentor_id_fk` FOREIGN KEY (`id_mentor`) REFERENCES `mentor` (`id_mentor`) ON UPDATE CASCADE,
  CONSTRAINT `mentee_university_id_fk` FOREIGN KEY (`id_university`) REFERENCES `university` (`id_university`) ON UPDATE CASCADE,
  CONSTRAINT `mentee_user_id_fk` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mentee`
--

LOCK TABLES `mentee` WRITE;
/*!40000 ALTER TABLE `mentee` DISABLE KEYS */;
INSERT INTO `mentee` (`id_mentee`, `phone_number`, `name`, `nim`, `class`, `session`, `category`, `major`, `id_user`, `id_mentor`, `id_university`) VALUES (1,81234,'Kelvin','123456','A','Siang',1,'sistem informasi',1,1,1),(2,844756,'andi','77567','B','Pagi',0,'mekatronik',3,1,1),(3,812423221,'permana aji syah','87789','C','Pagi',0,'sistem informasi manajemen',16,2,2),(4,8135489268,'hizkia yogi rafael','698177','C','Siang',1,'informatika',21,1,2),(5,8146678992,'hanif annafi','7032799','C','Pagi',1,'teknik komputer',22,1,2),(6,8341689798,'budi prasetio','46897','B','Pagi',1,'teknik komputer',23,2,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mentor`
--

LOCK TABLES `mentor` WRITE;
/*!40000 ALTER TABLE `mentor` DISABLE KEYS */;
INSERT INTO `mentor` (`id_mentor`, `nama`, `id_user`) VALUES (1,'olivia ristami',4),(2,'bill',6);
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pengajuan`
--

LOCK TABLES `pengajuan` WRITE;
/*!40000 ALTER TABLE `pengajuan` DISABLE KEYS */;
INSERT INTO `pengajuan` (`id_pengajuan`, `alasan`, `tipe`, `lampiran`, `date`, `id_mentee`) VALUES (5,'Sakit','izin',NULL,'2024-10-16',1),(6,'pusing','izin',NULL,'2024-10-18',1),(7,'fjsalkj','izin','1730306380819-2BpPGr4-bmw-e36-m3-wallpaper.jpg','2024-07-31',2),(8,'fjsalkjfjsakjdflk','izin','1730339681933-2BpPGr4-bmw-e36-m3-wallpaper.jpg','2024-07-31',2),(9,'fjsalkjfjsakjdflk','izin','1730339788233-2BpPGr4-bmw-e36-m3-wallpaper.jpg','2024-07-31',2),(10,'4stdryft','izin','1730339995508-2.jpg','2024-10-31',2),(11,'ty5u6t6gyu','izin','1730340062398-2.jpg','2024-10-31',2),(12,'5578fghhj','izin','1730340224622-s.jpg','2024-10-31',2),(13,'33fjlfd','izin','1730340297623-111.png','2024-10-31',2),(15,'test image postman','izin','1730432765464-2BpPGr4-bmw-e36-m3-wallpaper.jpg','2024-11-01',1),(16,'test pdf','izin','1730434417198-Surat Edaran Jadwal Pelaksanaan & Biaya Wisuda ke III-1.pdf','2024-11-01',1),(17,'Buat paspor','izin','1730447170140-5.jpg','2024-11-02',1),(18,'Ga bisa konversi','pengunduran diri','1730447538379-2.jpg','2024-11-01',1);
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
  `nilai` int DEFAULT NULL,
  `lampiran` text,
  `id_tugas` int NOT NULL,
  `id_mentee` int NOT NULL,
  PRIMARY KEY (`id_pengumpulan`),
  KEY `pengumpulan_tugas_mentee_id_fk` (`id_mentee`),
  KEY `pengumpulan_tugas_tugas_id_fk` (`id_tugas`),
  CONSTRAINT `pengumpulan_tugas_mentee_id_fk` FOREIGN KEY (`id_mentee`) REFERENCES `mentee` (`id_mentee`),
  CONSTRAINT `pengumpulan_tugas_tugas_id_fk` FOREIGN KEY (`id_tugas`) REFERENCES `tugas` (`id_tugas`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pengumpulan_tugas`
--

LOCK TABLES `pengumpulan_tugas` WRITE;
/*!40000 ALTER TABLE `pengumpulan_tugas` DISABLE KEYS */;
INSERT INTO `pengumpulan_tugas` (`id_pengumpulan`, `nilai`, `lampiran`, `id_tugas`, `id_mentee`) VALUES (2,14,'gambar2',1,2),(3,20,'gambar3',1,3),(4,37,'gambar4',2,2),(5,58,'gambar5',2,3),(6,50,'gambar6',3,5),(7,24,'gambar1',3,1),(12,90,'1730386109297-d.jpg',1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tugas`
--

LOCK TABLES `tugas` WRITE;
/*!40000 ALTER TABLE `tugas` DISABLE KEYS */;
INSERT INTO `tugas` (`id_tugas`, `subyek`, `batas_waktu`) VALUES (1,'Crazy Eight','2024-10-31'),(2,'Portofolio','2024-08-28'),(3,'HTML Tables','2024-08-31');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `university`
--

LOCK TABLES `university` WRITE;
/*!40000 ALTER TABLE `university` DISABLE KEYS */;
INSERT INTO `university` (`id_university`, `university_name`, `email`, `address`, `pic_name`, `pic_phone`, `pic_email`) VALUES (1,'institut teknologi batam','iteba@email.com','tiban','bapak 1',8111223,'bapak1@email.com'),(2,'Politeknik Negeri Batam','polibatam@email.com','batam center','bapak 2',816151354,'bapak2@email.com'),(4,'Universitas Putra Batam','upb@email.com','nagoya','bapak 3',846289656,'bapak3@email.com');
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `username`, `email`, `role`, `password`) VALUES (1,'kelvin','kelvin@email.com','mentee','1234'),(2,'test1','test1@email.com','admin','1234'),(3,'andi','andi@email.com','mentee','1234'),(4,'olivia','olivia@email.com','mentor','1234'),(5,'abdee','abdee@email.com','admin','1234'),(6,'bill','bill@email.com','mentor','1234'),(16,'aji','aji@email.com','mentee','1234'),(21,'yogi','yogi@email.com','mentee','1234'),(22,'hanif','hanif@email.com','mentee','1234'),(23,'buditio','buditio@email.com','mentee','buditio9798'),(25,'mentor1','mentor1@email.com','mentee','mentor11234'),(26,'mentee1','mentee1@email.com','mentee','mentee18665');
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

-- Dump completed on 2024-11-01 14:58:42
