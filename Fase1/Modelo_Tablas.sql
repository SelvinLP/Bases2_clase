-- MySQL Script generated by MySQL Workbench
-- Sat Oct  2 18:30:31 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS `bases2n_g12` DEFAULT CHARACTER SET UTF8MB4 ;
USE `bases2n_g12` ;

-- -----------------------------------------------------
-- Table `bases2n_g12`.`banco`
-- -----------------------------------------------------
#drop table banco;
CREATE TABLE IF NOT EXISTS `bases2n_g12`.`banco` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bases2n_g12`.`periodo`
-- -----------------------------------------------------
#drop table periodo;
CREATE TABLE IF NOT EXISTS `bases2n_g12`.`periodo` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Fecha` DATE NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bases2n_g12`.`reporte`
-- -----------------------------------------------------
#drop table reporte;
CREATE TABLE IF NOT EXISTS `bases2n_g12`.`reporte` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Activo` BIGINT NOT NULL,
  `Pasivo` BIGINT NOT NULL,
  `Capital` BIGINT NOT NULL,
  `banco_Id` INT ,
  `Fecha_Id` INT ,
  PRIMARY KEY (`Id`))
ENGINE=InnoDB;

#drop table tmp_fecha;
CREATE TEMPORARY TABLE tmp_fecha(
  fecha DATE
);

#drop table tmp_banco;
CREATE TEMPORARY TABLE tmp_banco(
  nombre VARCHAR(45)
);

#drop table tmp_reporte;
CREATE TEMPORARY TABLE tmp_reporte(
  banco VARCHAR(45),
  fecha DATE,
  activo BIGINT,
  pasivo BIGINT,
  capital BIGINT
);

-- ALTER DATABASE `bases2n_g12` CHARACTER SET UTF8MB4 COLLATE UTF8MB4_general_ci;
-- ALTER DATABASE `CPM2` CHARACTER SET UTF8MB4 COLLATE UTF8MB4_general_ci;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
