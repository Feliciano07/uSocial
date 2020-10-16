-- Consulta para obtener los no amigos de un usuario
    DELIMITER $$
    CREATE PROCEDURE no_amigos(usuario_logueado INT)
    BEGIN
        SELECT DISTINCT usr.id_usuario, usr.nombre, usr.url_imagen FROM
        Usuario usr
        WHERE NOT EXISTS(
            Select mg.amigo from Amigo mg
            WHERE mg.amigo = usr.id_usuario
            and mg.id_usuario = usuario_logueado
        )
        and usr.id_usuario != usuario_logueado;
    END
    $$
    -- call no_amigos(2);
--

-- Consulta para agregar un nuevo amigo 
    DELIMITER $$
    CREATE PROCEDURE agg_amigos(id_usuario INT, amigo INT)
    BEGIN
        INSERT INTO Amigo VALUES(id_usuario, amigo);
        INSERT INTO Amigo VALUES(amigo, id_usuario);
    END;
    $$

    
--