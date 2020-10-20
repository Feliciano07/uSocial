export interface No_Amigos{
    id_usuario?: number;
    nombre?: string;
    url_imagen?: string;
}

export interface Post {
    nombre?: string;
    url_imagen?: string;
    imagen_pl?: string;
    contenido?: string;
    fecha?: string;
    id_etiqueta?: number;
}

export interface Etiquetas {
    id_etiqueta?: number;
    nombre?: string;
}