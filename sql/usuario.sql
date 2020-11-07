
-- Crear usuarios
DELIMITER $$
CREATE PROCEDURE nuevo_usuario(Vnombre VARCHAR(200), Vusuario VARCHAR(45), Vpass VARCHAR(45), Vimagen VARCHAR(250))
BEGIN
	INSERT INTO Usuario(nombre,usuario,password,url_imagen,modo_bot) VALUES(Vnombre,Vusuario,Vpass,Vimagen,0);
    SELECT id_usuario FROM Usuario
    WHERE nombre = Vnombre and usuario = Vusuario and password = Vpass;
END;
$$

-- Actualizar usuarios 

