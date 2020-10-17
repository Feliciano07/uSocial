CREATE DATABASE  IF NOT EXISTS `red` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `red`;
-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: red
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `amigo`
--

DROP TABLE IF EXISTS `amigo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amigo` (
  `id_usuario` int NOT NULL,
  `amigo` int NOT NULL,
  PRIMARY KEY (`id_usuario`,`amigo`),
  KEY `fk_Amigo_Usuario_idx` (`id_usuario`),
  KEY `fk_Amigo_Usuario1_idx` (`amigo`),
  CONSTRAINT `fk_Amigo_Usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `fk_Amigo_Usuario1` FOREIGN KEY (`amigo`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amigo`
--

LOCK TABLES `amigo` WRITE;
/*!40000 ALTER TABLE `amigo` DISABLE KEYS */;
INSERT INTO `amigo` VALUES (1,2),(1,3),(1,4),(1,5),(2,1),(2,3),(2,4),(3,1),(3,2),(4,1),(4,2),(5,1);
/*!40000 ALTER TABLE `amigo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `etiqueta`
--

DROP TABLE IF EXISTS `etiqueta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `etiqueta` (
  `id_etiqueta` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id_etiqueta`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etiqueta`
--

LOCK TABLES `etiqueta` WRITE;
/*!40000 ALTER TABLE `etiqueta` DISABLE KEYS */;
INSERT INTO `etiqueta` VALUES (1,'perro'),(2,'gato'),(3,'carro');
/*!40000 ALTER TABLE `etiqueta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensaje`
--

DROP TABLE IF EXISTS `mensaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensaje` (
  `id_mensaje` int NOT NULL AUTO_INCREMENT,
  `mensaje` varchar(500) NOT NULL,
  `fecha` datetime NOT NULL,
  `id_sala_usuario` int NOT NULL,
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`id_mensaje`),
  KEY `fk_Mensaje_Sala_Usuario1_idx` (`id_sala_usuario`),
  KEY `fk_Mensaje_Usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_Mensaje_Sala_Usuario1` FOREIGN KEY (`id_sala_usuario`) REFERENCES `sala_usuario` (`id_sala_usuario`),
  CONSTRAINT `fk_Mensaje_Usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensaje`
--

LOCK TABLES `mensaje` WRITE;
/*!40000 ALTER TABLE `mensaje` DISABLE KEYS */;
/*!40000 ALTER TABLE `mensaje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publicacion`
--

DROP TABLE IF EXISTS `publicacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publicacion` (
  `id_publicacion` int NOT NULL AUTO_INCREMENT,
  `url_imagen` varchar(250) NOT NULL,
  `contenido` varchar(400) NOT NULL,
  `fecha` datetime NOT NULL,
  `id_usuario` int NOT NULL,
  `id_etiqueta` int NOT NULL,
  PRIMARY KEY (`id_publicacion`),
  KEY `fk_Publicacion_Usuario1_idx` (`id_usuario`),
  KEY `fk_Publicacion_Etiqueta1_idx` (`id_etiqueta`),
  CONSTRAINT `fk_Publicacion_Etiqueta1` FOREIGN KEY (`id_etiqueta`) REFERENCES `etiqueta` (`id_etiqueta`),
  CONSTRAINT `fk_Publicacion_Usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicacion`
--

LOCK TABLES `publicacion` WRITE;
/*!40000 ALTER TABLE `publicacion` DISABLE KEYS */;
INSERT INTO `publicacion` VALUES (1,'https://www.hola.com/imagenes/estar-bien/20190820147813/razas-perros-pequenos-parecen-grandes/0-711-550/razas-perro-pequenos-grandes-t.jpg','','2020-01-01 10:10:10',2,1),(2,'https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/594a1ced5bafe85dfd3c9869/gato-romano_0.jpg','','2020-01-01 10:10:10',2,2);
/*!40000 ALTER TABLE `publicacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sala`
--

DROP TABLE IF EXISTS `sala`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sala` (
  `id_sala` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id_sala`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sala`
--

LOCK TABLES `sala` WRITE;
/*!40000 ALTER TABLE `sala` DISABLE KEYS */;
/*!40000 ALTER TABLE `sala` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sala_usuario`
--

DROP TABLE IF EXISTS `sala_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sala_usuario` (
  `id_sala_usuario` int NOT NULL AUTO_INCREMENT,
  `id_sala` int NOT NULL,
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`id_sala_usuario`),
  KEY `fk_Sala_Usuario_Sala1_idx` (`id_sala`),
  KEY `fk_Sala_Usuario_Usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_Sala_Usuario_Sala1` FOREIGN KEY (`id_sala`) REFERENCES `sala` (`id_sala`),
  CONSTRAINT `fk_Sala_Usuario_Usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sala_usuario`
--

LOCK TABLES `sala_usuario` WRITE;
/*!40000 ALTER TABLE `sala_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `sala_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `usuario` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `url_imagen` varchar(250) NOT NULL,
  `modo_bot` int NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Luis Grijalva','chay','admin123','https://source.unsplash.com/random',0),(2,'Fernando Chajon','feliciano07','admin123','https://source.unsplash.com/random',0),(3,'Jennifer Chajon','yeni123','usuario123','https://source.unsplash.com/random',0),(4,'Luis Vargar','luis_vargas','usuario1234','https://source.unsplash.com/random',0),(5,'Erik Flores','erfd5','usuario12345','https://source.unsplash.com/random',0);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'red'
--

--
-- Dumping routines for database 'red'
--
/*!50003 DROP PROCEDURE IF EXISTS `agg_amigos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `agg_amigos`(id_usuario INT, amigo INT)
BEGIN
	INSERT INTO Amigo VALUES(id_usuario, amigo);
    INSERT INTO Amigo VALUES(amigo, id_usuario);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `no_amigos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `no_amigos`(usuario_logueado INT)
BEGIN
	SELECT DISTINCT usr.id_usuario, usr.nombre, usr.url_imagen FROM
	Usuario usr
	WHERE NOT EXISTS(
		Select mg.amigo from Amigo mg
		WHERE mg.amigo = usr.id_usuario
		and mg.id_usuario = usuario_logueado
	)
	and usr.id_usuario != usuario_logueado;
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

-- Dump completed on 2020-10-17  0:49:50
