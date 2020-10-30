-- MySQL Script generated by MySQL Workbench
-- Sun Oct 25 22:19:50 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Red
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Red
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Red` DEFAULT CHARACTER SET utf8 ;
USE `Red` ;

-- -----------------------------------------------------
-- Table `Red`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Red`.`Usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NOT NULL,
  `usuario` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `url_imagen` VARCHAR(250) NOT NULL,
  `modo_bot` INT NOT NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Red`.`Amigo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Red`.`Amigo` (
  `id_usuario` INT NOT NULL,
  `amigo` INT NOT NULL,
  INDEX `fk_Amigo_Usuario_idx` (`id_usuario` ASC) VISIBLE,
  INDEX `fk_Amigo_Usuario1_idx` (`amigo` ASC) VISIBLE,
  PRIMARY KEY (`id_usuario`, `amigo`),
  CONSTRAINT `fk_Amigo_Usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Red`.`Usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Amigo_Usuario1`
    FOREIGN KEY (`amigo`)
    REFERENCES `Red`.`Usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Red`.`Etiqueta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Red`.`Etiqueta` (
  `id_etiqueta` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_etiqueta`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Red`.`Publicacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Red`.`Publicacion` (
  `id_publicacion` INT NOT NULL AUTO_INCREMENT,
  `url_imagen` VARCHAR(250) NOT NULL,
  `contenido` VARCHAR(400) NOT NULL,
  `fecha` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `id_usuario` INT NOT NULL,
  `id_etiqueta` INT NOT NULL,
  PRIMARY KEY (`id_publicacion`),
  INDEX `fk_Publicacion_Usuario1_idx` (`id_usuario` ASC) VISIBLE,
  INDEX `fk_Publicacion_Etiqueta1_idx` (`id_etiqueta` ASC) VISIBLE,
  CONSTRAINT `fk_Publicacion_Usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Red`.`Usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Publicacion_Etiqueta1`
    FOREIGN KEY (`id_etiqueta`)
    REFERENCES `Red`.`Etiqueta` (`id_etiqueta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Red`.`Sala`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Red`.`Sala` (
  `id_sala` INT NOT NULL AUTO_INCREMENT,
  `fecha` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_sala`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Red`.`Sala_Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Red`.`Sala_Usuario` (
  `id_sala_usuario` INT NOT NULL AUTO_INCREMENT,
  `id_sala` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_sala_usuario`),
  INDEX `fk_Sala_Usuario_Sala1_idx` (`id_sala` ASC) VISIBLE,
  INDEX `fk_Sala_Usuario_Usuario1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_Sala_Usuario_Sala1`
    FOREIGN KEY (`id_sala`)
    REFERENCES `Red`.`Sala` (`id_sala`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Sala_Usuario_Usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Red`.`Usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Red`.`Mensaje`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Red`.`Mensaje` (
  `id_mensaje` INT NOT NULL AUTO_INCREMENT,
  `mensaje` VARCHAR(500) NOT NULL,
  `fecha` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `id_usuario` INT NOT NULL,
  `id_sala` INT NOT NULL,
  PRIMARY KEY (`id_mensaje`),
  INDEX `fk_Mensaje_Usuario1_idx` (`id_usuario` ASC) VISIBLE,
  INDEX `fk_Mensaje_Sala1_idx` (`id_sala` ASC) VISIBLE,
  CONSTRAINT `fk_Mensaje_Usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `Red`.`Usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Mensaje_Sala1`
    FOREIGN KEY (`id_sala`)
    REFERENCES `Red`.`Sala` (`id_sala`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
