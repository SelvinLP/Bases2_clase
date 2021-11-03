CREATE TABLE IF NOT EXISTS `bases2n_g12`.`usuarios` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `usuario` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL)
  ENGINE = InnoDB;
  
INSERT INTO usuarios (usuario, email, password)
VALUES ('selvin','selvin.lisandro@gmail.com', '123');

SELECT * FROM usuarios;