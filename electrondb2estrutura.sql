CREATE TABLE `product` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NULL DEFAULT NULL,
	`price` DECIMAL(10,0) NULL DEFAULT NULL,
	`description` TINYTEXT NULL,
	INDEX `Índice 1` (`id`)
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=11
;
--copiar y pegar el codigo create en una base de datos llamado electrondb2 en mariadb