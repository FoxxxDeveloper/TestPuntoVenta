-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: dbsistema_venta
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `IdCategoria` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(100) DEFAULT NULL,
  `Estado` tinyint(1) DEFAULT NULL,
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Gastos',1,'2023-05-03 21:31:46'),(2,'Bebidas',1,'2023-05-07 01:22:30'),(4,'Bebidas Alcoholicas',1,'2023-05-10 08:54:33'),(5,'Comestibles',1,'2023-05-10 08:54:40'),(6,'Limpieza',1,'2023-05-10 08:54:51');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `IdCliente` int NOT NULL AUTO_INCREMENT,
  `Documento` varchar(50) DEFAULT NULL,
  `NombreCompleto` varchar(50) DEFAULT NULL,
  `Correo` varchar(50) DEFAULT NULL,
  `Telefono` varchar(50) DEFAULT NULL,
  `Estado` tinyint(1) DEFAULT NULL,
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'000','Cliente a la calle','@gmail.com','3811234567',1,'2023-05-03 21:31:46'),(2,'111111','Anashei test de rucula','fullpik2@gmail.com','381000111',1,'2023-05-10 10:03:08'),(4,'2222','anashei','@gmaiñl','123123',1,'2023-05-10 10:59:07'),(5,'123123','asdasd','12312','123',1,'2023-05-10 10:59:12');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra` (
  `idCompra` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int DEFAULT NULL,
  `idProveedor` int DEFAULT NULL,
  `TipoDocumento` varchar(50) DEFAULT NULL,
  `Documento` varchar(50) DEFAULT NULL,
  `MontoTotal` decimal(10,2) DEFAULT NULL,
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idCompra`),
  KEY `fk_compra_usuario` (`idUsuario`),
  KEY `fk_compra_proveedor` (`idProveedor`),
  CONSTRAINT `fk_compra_proveedor` FOREIGN KEY (`idProveedor`) REFERENCES `proveedor` (`IdProveedor`),
  CONSTRAINT `fk_compra_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_compra`
--

DROP TABLE IF EXISTS `detalle_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_compra` (
  `idDetalleCompra` int NOT NULL AUTO_INCREMENT,
  `idCompra` int DEFAULT NULL,
  `idProducto` int DEFAULT NULL,
  `PrecioCompra` decimal(10,2) DEFAULT '0.00',
  `PrecioVenta` decimal(10,2) DEFAULT '0.00',
  `Cantidad` int DEFAULT NULL,
  `MontoTotal` decimal(10,2) DEFAULT NULL,
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idDetalleCompra`),
  KEY `fk_detallecompra_compra` (`idCompra`),
  KEY `fk_detallecompra_producto` (`idProducto`),
  CONSTRAINT `fk_detallecompra_compra` FOREIGN KEY (`idCompra`) REFERENCES `compra` (`idCompra`),
  CONSTRAINT `fk_detallecompra_producto` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`IdProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_compra`
--

LOCK TABLES `detalle_compra` WRITE;
/*!40000 ALTER TABLE `detalle_compra` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_venta`
--

DROP TABLE IF EXISTS `detalle_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_venta` (
  `idDetalleVenta` int NOT NULL AUTO_INCREMENT,
  `idVenta` int DEFAULT NULL,
  `idProducto` int DEFAULT NULL,
  `PrecioVenta` decimal(10,2) DEFAULT NULL,
  `Cantidad` int DEFAULT NULL,
  `SubTotal` decimal(10,2) DEFAULT NULL,
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idDetalleVenta`),
  KEY `fk_detalleventa_venta` (`idVenta`),
  KEY `fk_detalleventa_producto` (`idProducto`),
  CONSTRAINT `fk_detalleventa_producto` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`IdProducto`),
  CONSTRAINT `fk_detalleventa_venta` FOREIGN KEY (`idVenta`) REFERENCES `venta` (`idVenta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_venta`
--

LOCK TABLES `detalle_venta` WRITE;
/*!40000 ALTER TABLE `detalle_venta` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodo_pago`
--

DROP TABLE IF EXISTS `metodo_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodo_pago` (
  `IdMetodoPago` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(60) DEFAULT NULL,
  `Porcentaje` decimal(10,3) DEFAULT NULL,
  PRIMARY KEY (`IdMetodoPago`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodo_pago`
--

LOCK TABLES `metodo_pago` WRITE;
/*!40000 ALTER TABLE `metodo_pago` DISABLE KEYS */;
INSERT INTO `metodo_pago` VALUES (1,'Efectivo',10.000),(2,'Tarjeta debito',10.000),(3,'Tarjeta credito',15.000),(4,'Transferencia',5.000);
/*!40000 ALTER TABLE `metodo_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `negocio`
--

DROP TABLE IF EXISTS `negocio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `negocio` (
  `IdNegocio` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(60) DEFAULT NULL,
  `CUIT` varchar(60) DEFAULT NULL,
  `Direccion` varchar(60) DEFAULT NULL,
  `Logo` longblob,
  PRIMARY KEY (`IdNegocio`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `negocio`
--

LOCK TABLES `negocio` WRITE;
/*!40000 ALTER TABLE `negocio` DISABLE KEYS */;
INSERT INTO `negocio` VALUES (1,'Nombre del negocio','CUIT','Direccion',NULL);
/*!40000 ALTER TABLE `negocio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permiso`
--

DROP TABLE IF EXISTS `permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permiso` (
  `IdPermiso` int NOT NULL AUTO_INCREMENT,
  `IdRol` int DEFAULT NULL,
  `NombreMenu` varchar(100) DEFAULT NULL,
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdPermiso`),
  KEY `fk_permiso_rol` (`IdRol`),
  CONSTRAINT `fk_permiso_rol` FOREIGN KEY (`IdRol`) REFERENCES `rol` (`IdRol`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permiso`
--

LOCK TABLES `permiso` WRITE;
/*!40000 ALTER TABLE `permiso` DISABLE KEYS */;
INSERT INTO `permiso` VALUES (1,1,'menuusuario','2023-05-03 21:31:46'),(2,1,'menuconfiguracion','2023-05-03 21:31:46'),(3,1,'menuventas','2023-05-03 21:31:46'),(4,1,'menucompras','2023-05-03 21:31:46'),(5,1,'menuproveedores','2023-05-03 21:31:46'),(6,1,'menuclientes','2023-05-03 21:31:46'),(7,1,'menureportes','2023-05-03 21:31:46'),(8,1,'menunegocio','2023-05-03 21:31:46'),(9,1,'menuacercade','2023-05-03 21:31:46'),(10,2,'menuusuario','2023-05-03 21:31:46'),(11,2,'menuconfiguracion','2023-05-03 21:31:46'),(12,2,'menuventas','2023-05-03 21:31:46'),(13,2,'menucompras','2023-05-03 21:31:46'),(14,2,'menuproveedores','2023-05-03 21:31:46'),(15,2,'menuclientes','2023-05-03 21:31:46'),(16,2,'menureportes','2023-05-03 21:31:46'),(17,2,'menuacercade','2023-05-03 21:31:46'),(18,3,'menuconfiguracion','2023-05-03 21:31:46'),(19,3,'menuventas','2023-05-03 21:31:46'),(20,3,'menuclientes','2023-05-03 21:31:46'),(21,3,'menucompras','2023-05-03 21:31:46'),(22,3,'menureportes','2023-05-03 21:31:46'),(23,3,'menuacercade','2023-05-03 21:31:46');
/*!40000 ALTER TABLE `permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `IdProducto` int NOT NULL AUTO_INCREMENT,
  `Codigo` varchar(50) DEFAULT NULL,
  `Nombre` varchar(500) DEFAULT NULL,
  `Descripcion` varchar(50) DEFAULT NULL,
  `IdCategoria` int DEFAULT NULL,
  `Stock` int NOT NULL DEFAULT '0',
  `PrecioCompra` decimal(10,2) DEFAULT '0.00',
  `PrecioVenta` decimal(10,2) DEFAULT '0.00',
  `Estado` tinyint(1) DEFAULT NULL,
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdProducto`),
  KEY `fk_producto_categoria` (`IdCategoria`),
  CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`IdCategoria`) REFERENCES `categoria` (`IdCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=555 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (540,'A003','Je','Desc',1,300,100.00,200.00,1,'2023-05-10 07:22:08'),(541,'A003','Je','Desc',2,300,100.00,200.00,1,'2023-05-10 07:22:09'),(542,'A003','Je','Desc',1,300,100.00,200.00,1,'2023-05-10 07:22:09'),(544,'A003','Je','Desc',1,300,100.00,200.00,1,'2023-05-10 07:22:09'),(545,'A003','Je','Desc',1,300,100.00,200.00,1,'2023-05-10 07:22:09'),(546,'A003','Je','Desc',1,300,100.00,200.00,1,'2023-05-10 07:22:09'),(547,'A003','Je','Desc',1,300,100.00,200.00,1,'2023-05-10 07:22:09'),(548,'A003','Je','Desc',1,300,100.00,200.00,1,'2023-05-10 07:22:10'),(549,'A003','Je','Desc',1,300,100.00,200.00,1,'2023-05-10 07:22:14'),(550,'A003','Je','Desc',1,300,100.00,200.00,1,'2023-05-10 07:22:14'),(552,'A01','Coca-Cola 2L','Gaseosa muy dulce',1,200,400.00,800.00,1,'2023-05-10 07:35:55'),(553,'A005','Pepsi 3L','Gaseosa fria',1,100,100.00,200.00,1,'2023-05-10 07:43:08'),(554,'A007','Fanta 2L','Gaseosa',1,50,300.00,400.00,1,'2023-05-10 07:46:23');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `IdProveedor` int NOT NULL AUTO_INCREMENT,
  `Documento` varchar(50) DEFAULT NULL,
  `RazonSocial` varchar(50) DEFAULT NULL,
  `Correo` varchar(50) DEFAULT NULL,
  `Telefono` varchar(50) DEFAULT NULL,
  `Estado` tinyint(1) DEFAULT NULL,
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdProveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES (1,'asdasdasasdas','Test razonsocial','123123asda@','123123123',1,'2023-05-11 00:19:33'),(2,'asdasdas','asdasd','asdasd','123123',1,'2023-05-11 00:48:07'),(3,'deoxysmu00@gmail.com','01131504137','asd','01131504137',1,'2023-05-11 01:06:27'),(4,'deoxysmu00@gmail.com','01131504137','asd','01131504137',0,'2023-05-11 01:06:36');
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `IdRol` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(50) DEFAULT NULL,
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`IdRol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'ADMINISTRADOR','2023-05-03 21:31:46'),(2,'CEO','2023-05-03 21:31:46'),(3,'EMPLEADO','2023-05-03 21:31:46');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `Documento` varchar(50) DEFAULT NULL,
  `NombreCompleto` varchar(50) DEFAULT NULL,
  `Correo` varchar(50) DEFAULT NULL,
  `Clave` varchar(50) DEFAULT NULL,
  `idRol` int DEFAULT NULL,
  `Estado` tinyint(1) DEFAULT NULL,
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUsuario`),
  KEY `fk_usuario_rol` (`idRol`),
  CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`idRol`) REFERENCES `rol` (`IdRol`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'43226633','Pedro Alejandro Torres Salazar','Deoxysmu00@gmail.com','698465xd00',1,1,'2023-05-03 21:31:46'),(5,'123123123','asdasdasd','asdasd','3810001231231',1,1,'2023-05-10 23:41:00');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta` (
  `idVenta` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int DEFAULT NULL,
  `TipoDocumento` varchar(50) DEFAULT NULL,
  `NumeroDocumento` varchar(50) DEFAULT NULL,
  `DocumentoCliente` varchar(50) DEFAULT NULL,
  `NombreCliente` varchar(100) DEFAULT NULL,
  `MontoPago` decimal(10,2) DEFAULT NULL,
  `MontoCambio` decimal(10,2) DEFAULT NULL,
  `MontoTotal` decimal(10,2) DEFAULT NULL,
  `MetodoPago` varchar(50) DEFAULT NULL,
  `FechaRegistro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idVenta`),
  KEY `fk_venta_usuario` (`idUsuario`),
  CONSTRAINT `fk_venta_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-11 13:50:40
