CREATE DATABASE IF NOT EXISTS `dism` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `dism`;


CREATE TABLE IF NOT EXISTS observacion 
(
  `idema` varchar(45) default NULL,
  `ubicacion` varchar(45) default NULL,
  `fecha` varchar(45),
  `temperatura` varchar(45) default NULL,
  PRIMARY KEY  (`fecha`)
) 
ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;


INSERT INTO observacion (`idema`, `ubicacion`, `fecha`, `temperatura`) VALUES 
('12345X', 'Alicante', '2018-10-30T12:00:00', '11'),
('12345A', 'Madrid', '2023-12-30T12:32:21', '89')


