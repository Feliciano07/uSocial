-- Para crear una nueva publicacion
    DELIMITER $$
    CREATE PROCEDURE new_publicacion(Vid INT, Vimagen VARCHAR(250), Vcontenido varchar(400), Vlabel VARCHAR(100))
    BEGIN
        DECLARE id_eti INT DEFAULT -1;
        
        SELECT id_etiqueta INTO id_eti
        FROM Etiqueta
        WHERE Vlabel = nombre;
        
        IF id_eti > -1 THEN
            INSERT INTO Publicacion(url_imagen, contenido, id_usuario, id_etiqueta) VALUES(Vimagen, Vcontenido, Vid, id_eti);
        ELSE
            INSERT INTO Etiqueta(nombre) value(Vlabel);
            SELECT id_etiqueta INTO id_eti
            FROM Etiqueta
            WHERE Vlabel = nombre;
            INSERT INTO Publicacion(url_imagen, contenido, id_usuario, id_etiqueta) VALUES(Vimagen, Vcontenido, Vid, id_eti);
        END IF;
    END;
    $$

    -- call new_publicacion(4,'https://proyecto2-7.s3.us-east-2.amazonaws.com/publicaciones/imagen-1603149448533.jpeg'
     -- , 'Mi carro', 'Car');
--

-- Procedimiento para obtener las publicaciones 
    DELIMITER $$
    CREATE PROCEDURE publicaciones (Vid INT)
    BEGIN
        SELECT * FROM 
            (
                SELECT usr.nombre, usr.url_imagen, pl.url_imagen as imagen_pl, pl.contenido, pl.fecha, pl.id_etiqueta
                FROM Amigo am
                INNER JOIN
                Usuario usr
                ON am.amigo = usr.id_usuario
                INNER JOIN
                Publicacion pl
                ON usr.id_usuario = pl.id_usuario
                WHERE am.id_usuario = Vid
                UNION 
                SELECT 'yo', usr.url_imagen, pl.url_imagen as imagen_pl, pl.contenido, pl.fecha, pl.id_etiqueta
                FROM Usuario usr
                INNER JOIN 
                Publicacion pl
                ON usr.id_usuario = pl.id_usuario
                WHERE usr.id_usuario = Vid
            ) AS post
        ORDER BY post.fecha DESC;
    END;
    $$

-- Procedimiento para obtener las etiquetas 

    DELIMITER $$
    CREATE PROCEDURE obtener_etiqueta(Vid INT)
    BEGIN
        SELECT pl.id_etiqueta, et.nombre
        FROM Amigo am
        INNER JOIN 
        Usuario usr
        ON am.amigo = usr.id_usuario
        INNER JOIN 
        Publicacion pl
        ON usr.id_usuario = pl.id_usuario
        INNER JOIN
        Etiqueta et
        ON et.id_etiqueta = pl.id_etiqueta
        WHERE am.id_usuario = Vid
        UNION
        SELECT pl.id_etiqueta, et.nombre
        FROM Usuario usr
        INNER JOIN 
        Publicacion pl
        ON usr.id_usuario = pl.id_usuario
        INNER JOIN 
        Etiqueta et 
        ON pl.id_etiqueta = et.id_etiqueta
        WHERE usr.id_usuario = Vid;
    END;
    $$

--