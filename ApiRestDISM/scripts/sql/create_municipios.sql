CREATE DATABASE IF NOT EXISTS `dism` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `dism`;

-- Volcando estructura para tabla dism.municipios
CREATE TABLE IF NOT EXISTS municipios 
(
  `nombre` varchar(45),
  `latitud` varchar(45) default NULL,
  `longitud` varchar(45) default NULL,
  `habitantes` varchar(45) default NULL,
  PRIMARY KEY  (`nombre`)
) 
ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla dism.municipios: 2 rows
INSERT INTO municipios (`nombre`, `latitud`, `longitud`, `habitantes`) VALUES 
('Alicante', '1234N', '1234E', '350000'),
('Madrid', '12345S', '1234E', '4000000');


