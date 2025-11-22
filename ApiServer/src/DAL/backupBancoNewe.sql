-- MySQL dump 10.13  Distrib 8.0.44, for Linux (x86_64)
--
-- Host: localhost    Database: newe_database
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `ChecklistAgregado`
--

DROP TABLE IF EXISTS `ChecklistAgregado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ChecklistAgregado` (
  `check_agre_ID` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `respostas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `path_img` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`check_agre_ID`),
  CONSTRAINT `ChecklistAgregado_chk_1` CHECK (json_valid(`respostas`))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ChecklistAgregado`
--

LOCK TABLES `ChecklistAgregado` WRITE;
/*!40000 ALTER TABLE `ChecklistAgregado` DISABLE KEYS */;
INSERT INTO `ChecklistAgregado` VALUES (1,'agregado','{\"genero\":\"Prefiro não informar\",\"nomeMotorista\":\"Nome\",\"CNPJMotorista\":\"1283212\",\"CPFMotorista\":\"1238491283\",\"dataMotorista\":\"2001-10-02\",\"cidadeMotorista\":\"Sao\",\"telefoneMotorista\":\"12321\",\"emailMotorista\":\"danielpiloto05@gmail.com\",\"RGMotorista\":\"122312312312312\",\"RGEmissaoMotorista\":\"2023-10-02\",\"orgaoMotorista\":\"Orgão\",\"nomePaiMotorista\":\"Pai\",\"nomeMaeMotorista\":\"Mão\",\"pisMotorista\":\"Pis\",\"CEPMotorista\":\"Cep\",\"enderecoMotorista\":\"Endereco\",\"nomeProprietarioVeiculo\":\"NOme Completo\",\"placaVeiculo\":\"Placa\",\"marcaVeiculo\":\"Marca\",\"modeloVeiculo\":\"Modelo\",\"corVeiculo\":\"Cor\",\"anoVeiculo\":\"Ano de Fabricação\",\"cilindradaVeiculo\":\"Cilindrada\",\"bau\":\"Sim\",\"seguro\":\"Sim\",\"valorMin\":\"12\",\"valorMinKM\":\"12\"}',NULL),(2,'agregado','{\"genero\":\"Masculino\",\"nomeMotorista\":\"Joao da Silva Legal\",\"CNPJMotorista\":\"1298989802\",\"CPFMotorista\":\"2888199928\",\"dataMotorista\":\"2025-10-20\",\"cidadeMotorista\":\"São José dos Campos\",\"telefoneMotorista\":\"12898989989\",\"emailMotorista\":\"danielpiloto05@gmail.com\",\"RGMotorista\":\"84878288288\",\"RGEmissaoMotorista\":\"2019-02-12\",\"orgaoMotorista\":\"Orgao Expedidor de São Paulo\",\"nomePaiMotorista\":\"Pai\",\"nomeMaeMotorista\":\"Mãe\",\"pisMotorista\":\"Pis\",\"CEPMotorista\":\"129301290\",\"enderecoMotorista\":\"Rua Endereco\",\"nomeProprietarioVeiculo\":\"Joao Legal da Silva\",\"placaVeiculo\":\"123989019\",\"marcaVeiculo\":\"FIAT\",\"modeloVeiculo\":\"Uno\",\"corVeiculo\":\"Vermelho\",\"anoVeiculo\":\"2004\",\"cilindradaVeiculo\":\"1000\",\"bau\":\"Não\",\"seguro\":\"Não\",\"valorMin\":\"100\",\"valorMinKM\":\"4\"}',NULL),(3,'agregado','{\"genero\":\"Masculino\",\"nomeMotorista\":\"Motorista Exemplo\",\"CNPJMotorista\":\"1231451\",\"CPFMotorista\":\"1231242\",\"dataMotorista\":\"2025-10-29\",\"cidadeMotorista\":\"Sao\",\"telefoneMotorista\":\"12312321\",\"emailMotorista\":\"grapo747@gmail.com\",\"RGMotorista\":\"897989230918230921\",\"RGEmissaoMotorista\":\"2025-10-29\",\"orgaoMotorista\":\"Sao Jose\",\"nomePaiMotorista\":\"Joao\",\"nomeMaeMotorista\":\"maria\",\"pisMotorista\":\"Pis\",\"CEPMotorista\":\"1238989909\",\"enderecoMotorista\":\"Rua Endereco\",\"nomeProprietarioVeiculo\":\"Nome Completo\",\"placaVeiculo\":\"190283091\",\"marcaVeiculo\":\"FIAT\",\"modeloVeiculo\":\"UNO\",\"corVeiculo\":\"Vermelho\",\"anoVeiculo\":\"2004\",\"cilindradaVeiculo\":\"1000\",\"bau\":\"Não\",\"seguro\":\"Não\",\"valorMin\":\"100\",\"valorMinKM\":\"1000\"}',NULL),(4,'agregado','{\"genero\":\"Masculino\",\"nomeMotorista\":\"Daniel Piloto\",\"CNPJMotorista\":\"19201028301290\",\"CPFMotorista\":\"109238091283908\",\"dataMotorista\":\"2005-11-08\",\"cidadeMotorista\":\"Sao Jose dos Campos\",\"telefoneMotorista\":\"1298109909\",\"emailMotorista\":\"grapo747@gmail.com\",\"RGMotorista\":\"575757575757\",\"RGEmissaoMotorista\":\"2019-02-08\",\"orgaoMotorista\":\"Sao Paulo\",\"nomePaiMotorista\":\"Joao\",\"nomeMaeMotorista\":\"Mari\",\"pisMotorista\":\"Pis\",\"CEPMotorista\":\"1231290i99\",\"enderecoMotorista\":\"Rua da Casa\",\"nomeProprietarioVeiculo\":\"Daniel Piloto\",\"placaVeiculo\":\"918298390109\",\"marcaVeiculo\":\"Honda\",\"modeloVeiculo\":\"160\",\"corVeiculo\":\"Vermelho\",\"anoVeiculo\":\"2018\",\"cilindradaVeiculo\":\"160\",\"bau\":\"Sim\",\"seguro\":\"Sim\",\"valorMin\":\"20\",\"valorMinKM\":\"3\"}',NULL),(5,'agregado','{\"genero\":\"Masculino\",\"nomeMotorista\":\"Preencher\",\"CNPJMotorista\":\"123091239\",\"CPFMotorista\":\"3389080900\",\"dataMotorista\":\"2025-10-29\",\"cidadeMotorista\":\"Sao Jose dos Campos\",\"telefoneMotorista\":\"129381298391\",\"emailMotorista\":\"danuijafij\",\"RGMotorista\":\"01283219831209\",\"RGEmissaoMotorista\":\"9123-12-08\",\"orgaoMotorista\":\"198230981290\",\"nomePaiMotorista\":\"981230281\",\"nomeMaeMotorista\":\"098\",\"pisMotorista\":\"0981231203\",\"CEPMotorista\":\"308hs098yu\",\"enderecoMotorista\":\"09yh098y098\",\"nomeProprietarioVeiculo\":\"khihoiuh\",\"placaVeiculo\":\"uih\",\"marcaVeiculo\":\"iohuioh\",\"modeloVeiculo\":\"hiouhiu\",\"corVeiculo\":\"iuhihiouh\",\"anoVeiculo\":\"huoihiuh\",\"cilindradaVeiculo\":\"oiuhihui\",\"bau\":\"Sim\",\"seguro\":\"Sim\",\"valorMin\":\"uihoiiuhioh\",\"valorMinKM\":\"ohih\"}',NULL),(6,'agregado','{\"genero\":\"Masculino\",\"nomeMotorista\":\"ASOIDJASO\",\"CNPJMotorista\":\"oioij\",\"CPFMotorista\":\"oi\",\"dataMotorista\":\"1200-12-12\",\"cidadeMotorista\":\" k k\",\"telefoneMotorista\":\"kj k \",\"emailMotorista\":\"danielpiloto05@gmail.com\",\"RGMotorista\":\"0i90i0931209\",\"RGEmissaoMotorista\":\"0002-09-01\",\"orgaoMotorista\":\"1ioiosajii\",\"nomePaiMotorista\":\"fghjklj\",\"nomeMaeMotorista\":\"iooiuui\",\"pisMotorista\":\"ihoiuhiuh\",\"CEPMotorista\":\"iuhiuguyg\",\"enderecoMotorista\":\"iuyguyguy\",\"nomeProprietarioVeiculo\":\"guiguguyg\",\"placaVeiculo\":\"iguyguygiu\",\"marcaVeiculo\":\"goguygugy\",\"modeloVeiculo\":\"yiugugu\",\"corVeiculo\":\"uuigyuguy\",\"anoVeiculo\":\"uygiugyuiyg\",\"cilindradaVeiculo\":\"yugiugyyug\",\"bau\":\"Sim\",\"seguro\":\"Sim\",\"valorMin\":\"iuyguyguigu\",\"valorMinKM\":\"huiuyguy\"}',NULL),(7,'agregado','{\"genero\":\"Masculino\",\"nomeMotorista\":\"IJASDOJAS\",\"CNPJMotorista\":\"oihiuhiihiuh\",\"CPFMotorista\":\"huuihiuhiu\",\"dataMotorista\":\"2019-10-28\",\"cidadeMotorista\":\"joisajdoijasdij\",\"telefoneMotorista\":\"ijojoijiojoij\",\"emailMotorista\":\"hvst115@gmail.com\",\"RGMotorista\":\"dsakondoiasdoan\",\"RGEmissaoMotorista\":\"2025-10-27\",\"orgaoMotorista\":\"Orsjoifw\",\"nomePaiMotorista\":\"jinijnoin\",\"nomeMaeMotorista\":\"on\",\"pisMotorista\":\"ouinono\",\"CEPMotorista\":\"inoininoin\",\"enderecoMotorista\":\"oinininin\",\"nomeProprietarioVeiculo\":\"ininionin\",\"placaVeiculo\":\"inioniuniu\",\"marcaVeiculo\":\"noinoinoin\",\"modeloVeiculo\":\"ininin\",\"corVeiculo\":\"ionini\",\"anoVeiculo\":\"niinninin\",\"cilindradaVeiculo\":\"iinin\",\"bau\":\"Não\",\"seguro\":\"Não\",\"valorMin\":\"10\",\"valorMinKM\":\"12\"}',NULL),(8,'agregado','{\"genero\":\"Masculino\",\"nomeMotorista\":\"0iasjdosajdoias\",\"CNPJMotorista\":\"ioasndoisado\",\"CPFMotorista\":\"12i3902109\",\"dataMotorista\":\"2019-12-12\",\"cidadeMotorista\":\"ihiosaoidnsao\",\"telefoneMotorista\":\"onoiasncoisan\",\"emailMotorista\":\"grapo747@gmail.com\",\"RGMotorista\":\"9912i92190\",\"RGEmissaoMotorista\":\"2025-10-27\",\"orgaoMotorista\":\"1293i12093i2\",\"nomePaiMotorista\":\"imdsiqmc0q0m\",\"nomeMaeMotorista\":\"09m09mc0am0\",\"pisMotorista\":\"oijscisdiohci\",\"CEPMotorista\":\"puihijoioiuh\",\"enderecoMotorista\":\"iuhiuhiou\",\"nomeProprietarioVeiculo\":\"hiuhiohuoih\",\"placaVeiculo\":\"hoihiuhiu\",\"marcaVeiculo\":\"hoiuhiouhiu\",\"modeloVeiculo\":\"huiohoiuhui\",\"corVeiculo\":\"uiiuiuhiihoiuhh\",\"anoVeiculo\":\"jhuihuiuhohoi\",\"cilindradaVeiculo\":\"oihoihoio\",\"bau\":\"Não\",\"seguro\":\"Não\",\"valorMin\":\"10\",\"valorMinKM\":\"12\"}',NULL),(9,'agregado','{\"genero\":\"Masculino\",\"nomeMotorista\":\"AOSdoiasjj\",\"CNPJMotorista\":\"sodjasodjsaioj\",\"CPFMotorista\":\"ijoijijsdpo\",\"dataMotorista\":\"2017-12-10\",\"cidadeMotorista\":\"JASJODIJoasj\",\"telefoneMotorista\":\"oijsdoijoiasj\",\"emailMotorista\":\"grapo747@gmail.com\",\"RGMotorista\":\"oijdsoifoidsjf\",\"RGEmissaoMotorista\":\"2025-10-27\",\"orgaoMotorista\":\"kjfoijfoisdjo\",\"nomePaiMotorista\":\"iojoijoijoij\",\"nomeMaeMotorista\":\"oioijoijoij\",\"pisMotorista\":\"oijoijoij\",\"CEPMotorista\":\"oijiojoijioj\",\"enderecoMotorista\":\"oijoijoijoij\",\"nomeProprietarioVeiculo\":\"oijoijoij\",\"placaVeiculo\":\"ojoijoi\",\"marcaVeiculo\":\"oijoij\",\"modeloVeiculo\":\"oijoij\",\"corVeiculo\":\"oijoij\",\"anoVeiculo\":\"oijojio\",\"cilindradaVeiculo\":\"oijoijioj\",\"bau\":\"Não\",\"seguro\":\"Não\",\"valorMin\":\"10\",\"valorMinKM\":\"10\"}',NULL),(10,'agregado','{\"genero\":\"Masculino\",\"nomeMotorista\":\"Nome\",\"CNPJMotorista\":\"1oijoiaisomd\\\\\",\"CPFMotorista\":\"123123812\",\"dataMotorista\":\"2019-12-28\",\"cidadeMotorista\":\"Sao JOse dos CMApo\",\"telefoneMotorista\":\"12312\",\"emailMotorista\":\"grapo747@gmail.com\",\"RGMotorista\":\"123213123\",\"RGEmissaoMotorista\":\"2025-10-27\",\"orgaoMotorista\":\"Sao Paulo\",\"nomePaiMotorista\":\"asdasd\",\"nomeMaeMotorista\":\"uyiuhiu\",\"pisMotorista\":\"ibiiuiu\",\"CEPMotorista\":\"uiuihiuh\",\"enderecoMotorista\":\"iuhiuhiu\",\"nomeProprietarioVeiculo\":\"iuhiuhiu\",\"placaVeiculo\":\"hiuhiuhiu\",\"marcaVeiculo\":\"dasd\",\"modeloVeiculo\":\"Uno\",\"corVeiculo\":\"Varmelho\",\"anoVeiculo\":\"asdas\",\"cilindradaVeiculo\":\"dasd\",\"bau\":\"Não\",\"seguro\":\"Não\",\"valorMin\":\"10\",\"valorMinKM\":\"12\"}',NULL);
/*!40000 ALTER TABLE `ChecklistAgregado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ChecklistFuncionario`
--

DROP TABLE IF EXISTS `ChecklistFuncionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ChecklistFuncionario` (
  `check_func_ID` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `respostas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `path_img` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`check_func_ID`),
  CONSTRAINT `ChecklistFuncionario_chk_1` CHECK (json_valid(`respostas`))
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ChecklistFuncionario`
--

LOCK TABLES `ChecklistFuncionario` WRITE;
/*!40000 ALTER TABLE `ChecklistFuncionario` DISABLE KEYS */;
INSERT INTO `ChecklistFuncionario` VALUES (9,'abertura','{\"qmPreenchendo\":\"Teco\",\"dataAberturaEmpresa\":\"2025-10-24\",\"abriuEmpresa\":true,\"abriuPortaoSocial\":true,\"abriuPortaRolante\":true,\"desbloqueouAlarme\":true,\"apagouLuzesArmazem\":true,\"acendeuLuzesArmazem\":true,\"acendeuLuzesOperacional\":true,\"ligouArCondicionado\":true,\"ligouTVCameras\":true,\"ligouTVDashBoard\":true,\"coletouChavesChaveiro\":true,\"abriuPortaBanheiro\":true,\"removeuCadeadoPortao1\":true,\"removeuCadeadoPortao2\":true,\"colocouConeEstacionamentoPCD\":true,\"ligouTomadaTirouPlasticoBebedouro\":true,\"colocouTapetesDevidosLugares\":true,\"fezCafe\":true,\"observacao\":\"Tudo Certo\"}',NULL);
/*!40000 ALTER TABLE `ChecklistFuncionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cliente`
--

DROP TABLE IF EXISTS `Cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cliente` (
  `cliente_ID` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `endereco` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `segmento_atuacao` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `funcionario_ID` int DEFAULT NULL,
  `funil_ID` int DEFAULT NULL,
  PRIMARY KEY (`cliente_ID`),
  KEY `FK_70e132bf1f92bb6d009bb3bb810` (`funcionario_ID`),
  KEY `FK_b5873b13256f9258b1e3f8a8cc6` (`funil_ID`),
  CONSTRAINT `FK_70e132bf1f92bb6d009bb3bb810` FOREIGN KEY (`funcionario_ID`) REFERENCES `Funcionario` (`funcionario_ID`),
  CONSTRAINT `FK_b5873b13256f9258b1e3f8a8cc6` FOREIGN KEY (`funil_ID`) REFERENCES `Funil_vendas` (`funil_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cliente`
--

LOCK TABLES `Cliente` WRITE;
/*!40000 ALTER TABLE `Cliente` DISABLE KEYS */;
INSERT INTO `Cliente` VALUES (2,'Empresa Beta','Av. Rio Branco, 200','Metalúrgia',3,4),(7,'Empresa Alpha','Rua Alguma Coisa','Atuações',2,2),(11,'Empresa Z','Rua da Empresa Y','Vendas',1,7),(13,'Guarana Dolly','iuhiuhi','iuiniu',2,2);
/*!40000 ALTER TABLE `Cliente` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_after_cliente_update` AFTER UPDATE ON `Cliente` FOR EACH ROW BEGIN
        IF NOT (OLD.funil_ID <=> NEW.funil_ID) THEN
          INSERT INTO Historico_funil (cliente_ID, funil_ID, data_movimentacao)
          VALUES (NEW.cliente_ID, NEW.funil_ID, NOW());
        END IF;
      END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Contato_cliente`
--

DROP TABLE IF EXISTS `Contato_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Contato_cliente` (
  `contato_cliente_ID` int NOT NULL AUTO_INCREMENT,
  `tipo_contato` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `valor_contato` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `cliente_ID` int DEFAULT NULL,
  PRIMARY KEY (`contato_cliente_ID`),
  KEY `FK_50cb9aaeca047b8fe653c9fad02` (`cliente_ID`),
  CONSTRAINT `FK_50cb9aaeca047b8fe653c9fad02` FOREIGN KEY (`cliente_ID`) REFERENCES `Cliente` (`cliente_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contato_cliente`
--

LOCK TABLES `Contato_cliente` WRITE;
/*!40000 ALTER TABLE `Contato_cliente` DISABLE KEYS */;
INSERT INTO `Contato_cliente` VALUES (11,'celular','123456789010',7),(22,'email','empresaY@email.com',11),(23,'celular','123456767',13);
/*!40000 ALTER TABLE `Contato_cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Evento_treinamento`
--

DROP TABLE IF EXISTS `Evento_treinamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Evento_treinamento` (
  `evento_ID` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `descricao` longtext COLLATE utf8mb4_general_ci,
  `dataHora` datetime NOT NULL,
  `duracao_horas` float NOT NULL,
  `evento_link` longtext COLLATE utf8mb4_general_ci,
  `status` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `organizador_ID` int DEFAULT NULL,
  PRIMARY KEY (`evento_ID`),
  KEY `FK_7cfb9f5abe404e7c976eef9776f` (`organizador_ID`),
  CONSTRAINT `FK_7cfb9f5abe404e7c976eef9776f` FOREIGN KEY (`organizador_ID`) REFERENCES `Funcionario` (`funcionario_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Evento_treinamento`
--

LOCK TABLES `Evento_treinamento` WRITE;
/*!40000 ALTER TABLE `Evento_treinamento` DISABLE KEYS */;
INSERT INTO `Evento_treinamento` VALUES (1,'Treinamento de Vendas Consultivas','Curso avançado de técnicas de vendas.','2025-09-25 09:00:00',4,'https://evento.com/vendas','Ativo',1);
/*!40000 ALTER TABLE `Evento_treinamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Funcionario`
--

DROP TABLE IF EXISTS `Funcionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Funcionario` (
  `funcionario_ID` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `genero` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `endereco` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `numero_telefone` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `cargo` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `senha_hash` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `localizacao_funcionario` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `gerente_ID` int DEFAULT NULL,
  `cpf` varchar(11) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `data_admissao` datetime DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  PRIMARY KEY (`funcionario_ID`),
  UNIQUE KEY `IDX_0e2ca5f6f89d0a834ee47c195f` (`email`),
  UNIQUE KEY `unique_cpf` (`cpf`),
  KEY `FK_b13934bb9abdb7b2f4faef99ced` (`gerente_ID`),
  CONSTRAINT `FK_b13934bb9abdb7b2f4faef99ced` FOREIGN KEY (`gerente_ID`) REFERENCES `Funcionario` (`funcionario_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Funcionario`
--

LOCK TABLES `Funcionario` WRITE;
/*!40000 ALTER TABLE `Funcionario` DISABLE KEYS */;
INSERT INTO `Funcionario` VALUES (1,'Carlos Silva','Masculino','Rua A, 123','11999999999','Gerente de Vendas','carlos@empresa.com','$2b$10$MFzYXnHP3r4sURVJvahPvOGAaeFKDxlYDF.yvHF5VCAty8JLG5ZIi','São Paulo',NULL,'12345678901','2023-01-15 09:00:00','1990-05-20'),(2,'Ana Oliveira','Feminino','Rua B, 456','11888888888','Vendedor','ana@empresa.com','$2b$10$MFzYXnHP3r4sURVJvahPvOGAaeFKDxlYDF.yvHF5VCAty8JLG5ZIi','São Paulo',1,'98765432100','2023-02-01 09:00:00','1992-08-15'),(3,'João Souza','Masculino','Rua C, 789','11777777777','Consultor','joao@empresa.com','$2b$10$MFzYXnHP3r4sURVJvahPvOGAaeFKDxlYDF.yvHF5VCAty8JLG5ZIi','Rio de Janeiro',1,'11122233344','2023-03-10 09:00:00','1988-12-30');
/*!40000 ALTER TABLE `Funcionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Funcionarios_convidados`
--

DROP TABLE IF EXISTS `Funcionarios_convidados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Funcionarios_convidados` (
  `funcionario_id` int NOT NULL,
  `evento_id` int NOT NULL,
  PRIMARY KEY (`funcionario_id`,`evento_id`),
  KEY `FK_50bb6dbfc38b7c408dc0ebd1973` (`evento_id`),
  CONSTRAINT `FK_50bb6dbfc38b7c408dc0ebd1973` FOREIGN KEY (`evento_id`) REFERENCES `Evento_treinamento` (`evento_ID`) ON DELETE CASCADE,
  CONSTRAINT `FK_66f1d2b0d133bb6ddda6739a9fb` FOREIGN KEY (`funcionario_id`) REFERENCES `Funcionario` (`funcionario_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Funcionarios_convidados`
--

LOCK TABLES `Funcionarios_convidados` WRITE;
/*!40000 ALTER TABLE `Funcionarios_convidados` DISABLE KEYS */;
INSERT INTO `Funcionarios_convidados` VALUES (2,1),(3,1);
/*!40000 ALTER TABLE `Funcionarios_convidados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Funil_vendas`
--

DROP TABLE IF EXISTS `Funil_vendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Funil_vendas` (
  `funil_ID` int NOT NULL AUTO_INCREMENT,
  `estagio_nome` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`funil_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Funil_vendas`
--

LOCK TABLES `Funil_vendas` WRITE;
/*!40000 ALTER TABLE `Funil_vendas` DISABLE KEYS */;
INSERT INTO `Funil_vendas` VALUES (1,'Prospeccao'),(2,'Inicial'),(3,'Potencial'),(4,'Manutencao'),(5,'Negociacao'),(6,'FollowUp'),(7,'Vendas'),(8,'NaoVendas');
/*!40000 ALTER TABLE `Funil_vendas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Historico_funil`
--

DROP TABLE IF EXISTS `Historico_funil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Historico_funil` (
  `historico_ID` int NOT NULL AUTO_INCREMENT,
  `data_movimentacao` timestamp NOT NULL,
  `cliente_ID` int DEFAULT NULL,
  `funil_ID` int DEFAULT NULL,
  PRIMARY KEY (`historico_ID`),
  KEY `FK_c3ff30955f7a883c410d1755583` (`cliente_ID`),
  KEY `FK_333d628457f18f33a1735cba62b` (`funil_ID`),
  CONSTRAINT `FK_333d628457f18f33a1735cba62b` FOREIGN KEY (`funil_ID`) REFERENCES `Funil_vendas` (`funil_ID`),
  CONSTRAINT `FK_c3ff30955f7a883c410d1755583` FOREIGN KEY (`cliente_ID`) REFERENCES `Cliente` (`cliente_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Historico_funil`
--

LOCK TABLES `Historico_funil` WRITE;
/*!40000 ALTER TABLE `Historico_funil` DISABLE KEYS */;
INSERT INTO `Historico_funil` VALUES (2,'2025-10-23 01:27:51',2,2),(4,'2025-10-26 23:33:12',2,6),(13,'2025-10-26 23:34:56',2,3),(16,'2025-10-26 23:34:59',2,1),(21,'2025-10-26 23:35:06',2,4),(22,'2025-10-26 23:39:37',7,2),(23,'2025-10-26 23:39:51',2,7),(24,'2025-10-26 23:39:57',2,6),(25,'2025-10-26 23:40:01',7,5),(26,'2025-10-26 23:41:04',2,2),(27,'2025-10-26 23:41:05',2,6),(28,'2025-10-26 23:41:06',2,2),(29,'2025-10-26 23:41:07',2,6),(30,'2025-10-26 23:41:07',2,2),(32,'2025-10-26 23:59:46',11,7),(33,'2025-10-26 23:59:47',11,3),(34,'2025-10-26 23:59:51',11,6),(35,'2025-10-26 23:59:52',11,7),(36,'2025-10-26 23:59:53',11,8),(37,'2025-10-27 01:12:50',2,6),(38,'2025-10-27 01:12:51',7,2),(39,'2025-10-27 01:12:52',11,7),(40,'2025-10-27 01:24:13',7,3),(41,'2025-10-27 01:24:14',11,2),(42,'2025-10-27 16:17:47',2,7),(43,'2025-10-27 16:18:13',11,6),(44,'2025-10-27 16:18:14',7,8),(45,'2025-10-27 16:18:15',2,4),(46,'2025-10-27 16:18:15',7,3),(47,'2025-10-27 16:18:16',11,3),(48,'2025-10-27 16:18:17',7,7),(49,'2025-10-28 11:44:52',7,2),(50,'2025-10-28 11:44:53',11,6),(51,'2025-10-28 11:46:10',11,7);
/*!40000 ALTER TABLE `Historico_funil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Interacao_cliente`
--

DROP TABLE IF EXISTS `Interacao_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Interacao_cliente` (
  `interacao_ID` int NOT NULL AUTO_INCREMENT,
  `data_interacao` date NOT NULL,
  `tipo_interacao` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `relatorio_interacao` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `funcionario_ID` int DEFAULT NULL,
  `cliente_ID` int DEFAULT NULL,
  PRIMARY KEY (`interacao_ID`),
  KEY `FK_cb34e5d245ba3c99e3a541d7ef9` (`funcionario_ID`),
  KEY `FK_67a8108793b88002a2bd16ac853` (`cliente_ID`),
  CONSTRAINT `FK_67a8108793b88002a2bd16ac853` FOREIGN KEY (`cliente_ID`) REFERENCES `Cliente` (`cliente_ID`),
  CONSTRAINT `FK_cb34e5d245ba3c99e3a541d7ef9` FOREIGN KEY (`funcionario_ID`) REFERENCES `Funcionario` (`funcionario_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Interacao_cliente`
--

LOCK TABLES `Interacao_cliente` WRITE;
/*!40000 ALTER TABLE `Interacao_cliente` DISABLE KEYS */;
INSERT INTO `Interacao_cliente` VALUES (2,'2025-09-22','Chamada','Cliente não atendeu, reagendado.',3,2);
/*!40000 ALTER TABLE `Interacao_cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Lembrete`
--

DROP TABLE IF EXISTS `Lembrete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Lembrete` (
  `lembrete_ID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `titulo` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `dataHora` datetime NOT NULL,
  `categoria` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`lembrete_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Lembrete`
--

LOCK TABLES `Lembrete` WRITE;
/*!40000 ALTER TABLE `Lembrete` DISABLE KEYS */;
INSERT INTO `Lembrete` VALUES (1,'usuario@exemplo.com','Reunião','2025-10-27 13:20:00','Reunião');
/*!40000 ALTER TABLE `Lembrete` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notificacao`
--

DROP TABLE IF EXISTS `Notificacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notificacao` (
  `notificacao_ID` int NOT NULL AUTO_INCREMENT,
  `titulo_notificacao` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `corpo_notificacao` longtext COLLATE utf8mb4_general_ci,
  `evento_ID` int DEFAULT NULL,
  PRIMARY KEY (`notificacao_ID`),
  KEY `FK_13bf01535d8fd63e3838b6b238d` (`evento_ID`),
  CONSTRAINT `FK_13bf01535d8fd63e3838b6b238d` FOREIGN KEY (`evento_ID`) REFERENCES `Evento_treinamento` (`evento_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notificacao`
--

LOCK TABLES `Notificacao` WRITE;
/*!40000 ALTER TABLE `Notificacao` DISABLE KEYS */;
INSERT INTO `Notificacao` VALUES (1,'Lembrete: Treinamento','Não se esqueça do treinamento agendado.',1);
/*!40000 ALTER TABLE `Notificacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notificacao_convidados`
--

DROP TABLE IF EXISTS `Notificacao_convidados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notificacao_convidados` (
  `funcionario_ID` int NOT NULL,
  `evento_ID` int NOT NULL,
  `notificacao_ID` int NOT NULL,
  `status_leitura` tinyint NOT NULL,
  `data_leitura` timestamp NULL DEFAULT NULL,
  `prioridade` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`funcionario_ID`,`evento_ID`,`notificacao_ID`),
  KEY `FK_bf5c5fca40a401d990ae8a2a3e8` (`notificacao_ID`),
  CONSTRAINT `FK_2db1f5eae0532a74fe60d60dae8` FOREIGN KEY (`funcionario_ID`, `evento_ID`) REFERENCES `Funcionarios_convidados` (`funcionario_id`, `evento_id`),
  CONSTRAINT `FK_bf5c5fca40a401d990ae8a2a3e8` FOREIGN KEY (`notificacao_ID`) REFERENCES `Notificacao` (`notificacao_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notificacao_convidados`
--

LOCK TABLES `Notificacao_convidados` WRITE;
/*!40000 ALTER TABLE `Notificacao_convidados` DISABLE KEYS */;
INSERT INTO `Notificacao_convidados` VALUES (2,1,1,1,'2025-09-24 13:00:00','Alta'),(3,1,1,0,NULL,'Alta');
/*!40000 ALTER TABLE `Notificacao_convidados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Perfil`
--

DROP TABLE IF EXISTS `Perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Perfil` (
  `perfil_ID` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `descricao` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`perfil_ID`),
  UNIQUE KEY `IDX_78e529846fd005b60eee98c2ab` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Perfil`
--

LOCK TABLES `Perfil` WRITE;
/*!40000 ALTER TABLE `Perfil` DISABLE KEYS */;
INSERT INTO `Perfil` VALUES (1,'master','Acesso total ao sistema'),(2,'vendedor','Pode cadastrar e gerenciar clientes'),(3,'gestor','Acesso intermediario entre master e vendedor');
/*!40000 ALTER TABLE `Perfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Presenca`
--

DROP TABLE IF EXISTS `Presenca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Presenca` (
  `presenca_ID` int NOT NULL AUTO_INCREMENT,
  `presente` tinyint NOT NULL,
  `razao_recusa` longtext COLLATE utf8mb4_general_ci,
  `data_termino` timestamp NULL DEFAULT NULL,
  `link_feedback` longtext COLLATE utf8mb4_general_ci,
  `funcionario_ID` int DEFAULT NULL,
  `evento_ID` int DEFAULT NULL,
  PRIMARY KEY (`presenca_ID`),
  KEY `FK_2769263adcec6e12e8a8950376b` (`funcionario_ID`,`evento_ID`),
  CONSTRAINT `FK_2769263adcec6e12e8a8950376b` FOREIGN KEY (`funcionario_ID`, `evento_ID`) REFERENCES `Funcionarios_convidados` (`funcionario_id`, `evento_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Presenca`
--

LOCK TABLES `Presenca` WRITE;
/*!40000 ALTER TABLE `Presenca` DISABLE KEYS */;
INSERT INTO `Presenca` VALUES (1,1,NULL,'2025-09-25 16:00:00','https://evento.com/feedback1',2,1),(2,0,'Conflito de agenda',NULL,NULL,3,1);
/*!40000 ALTER TABLE `Presenca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vendas`
--

DROP TABLE IF EXISTS `Vendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Vendas` (
  `venda_ID` int NOT NULL AUTO_INCREMENT,
  `data_venda` timestamp NOT NULL,
  `valor_total` decimal(10,2) NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `cliente_ID` int DEFAULT NULL,
  `funcionario_ID` int DEFAULT NULL,
  PRIMARY KEY (`venda_ID`),
  KEY `FK_acdcb804cd337af00d52ff4b4bd` (`cliente_ID`),
  KEY `FK_c3a06704616da020d157ed7ce8d` (`funcionario_ID`),
  CONSTRAINT `FK_acdcb804cd337af00d52ff4b4bd` FOREIGN KEY (`cliente_ID`) REFERENCES `Cliente` (`cliente_ID`),
  CONSTRAINT `FK_c3a06704616da020d157ed7ce8d` FOREIGN KEY (`funcionario_ID`) REFERENCES `Funcionario` (`funcionario_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vendas`
--

LOCK TABLES `Vendas` WRITE;
/*!40000 ALTER TABLE `Vendas` DISABLE KEYS */;
INSERT INTO `Vendas` VALUES (2,'2025-09-16 03:00:00',3200.00,'Manutencao',2,3);
/*!40000 ALTER TABLE `Vendas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionario_perfis`
--

DROP TABLE IF EXISTS `funcionario_perfis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionario_perfis` (
  `funcionario_ID` int NOT NULL,
  `perfil_ID` int NOT NULL,
  PRIMARY KEY (`funcionario_ID`,`perfil_ID`),
  KEY `IDX_cedda5ee8922623803ade58046` (`funcionario_ID`),
  KEY `IDX_97b28c5818288522846585bceb` (`perfil_ID`),
  CONSTRAINT `FK_97b28c5818288522846585bceb5` FOREIGN KEY (`perfil_ID`) REFERENCES `Perfil` (`perfil_ID`),
  CONSTRAINT `FK_cedda5ee8922623803ade580460` FOREIGN KEY (`funcionario_ID`) REFERENCES `Funcionario` (`funcionario_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionario_perfis`
--

LOCK TABLES `funcionario_perfis` WRITE;
/*!40000 ALTER TABLE `funcionario_perfis` DISABLE KEYS */;
INSERT INTO `funcionario_perfis` VALUES (1,1),(2,3),(3,3);
/*!40000 ALTER TABLE `funcionario_perfis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1761182139716,'PrimeiraMigration1761182139716'),(2,1978901234567,'CreateClienteTrigger1978901234567');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-22 22:22:34
