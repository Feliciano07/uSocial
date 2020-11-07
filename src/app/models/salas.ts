export interface Salas{
    id_usuario?: number;
    nombre?: string;
    id_sala?: number;
}

export interface Mensaje{
    id_mensaje?: number;
    mensaje?: string;
    fecha?: string | Date;
    id_usuario?: number;
    id_sala?: number;
}