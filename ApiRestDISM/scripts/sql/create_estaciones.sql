CREATE DATABASE IF NOT EXISTS `dism` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `dism`;

-- Volcando estructura para tabla dism.estaciones
CREATE TABLE IF NOT EXISTS estaciones 
(
  `nombre` varchar(45) default NULL,
  `latitud` varchar(45) default NULL,
  `longitud` varchar(45) default NULL,
  `idema` varchar(45),
  PRIMARY KEY  (`idema`)
) 
ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla dism.estaciones: 2 rows
INSERT INTO estaciones (`nombre`, `latitud`, `longitud`, `idema`) VALUES 
('Alicante', '1234N', '1234E', '1387'),
('Ecija', '12345S', '1234E', '5641X');


