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
    END;
    $$
    -- call no_amigos(2);
--

-- Consulta para agregar un nuevo amigo 
    DELIMITER $$
    CREATE PROCEDURE agg_amigos(id_usuario INT, amigo INT)
    BEGIN
		DECLARE id_sala1 INT;
        INSERT INTO Amigo VALUES(id_usuario, amigo);
        INSERT INTO Amigo VALUES(amigo, id_usuario);
		INSERT INTO Sala VALUES();
        SELECT last_insert_id() INTO id_sala1;
        INSERT INTO Sala_usuario(id_sala,id_usuario) VALUES(id_sala1,id_usuario);
        INSERT INTO Sala_usuario(id_sala,id_usuario) VALUES(id_sala1,amigo);
    END;
    $$
--

--  obtener las salas de chat 
DELIMITER $$
CREATE PROCEDURE Obtener_salas(Vid_usuario int)
BEGIN
	SELECT usr.id_usuario, usr.nombre, sl.id_sala
	FROM Amigo am
	INNER JOIN
	Usuario usr
	ON am.amigo = usr.id_usuario
	INNER JOIN
	Sala_usuario sl
	on am.amigo = sl.id_usuario
	where am.id_usuario = Vid_usuario;
END;
$$ 