"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const keys_1 = __importDefault(require("./keys"));
const { promisify } = require('util'); //final
const pool = mysql_1.default.createPool(keys_1.default.database); //modulo de conexion de la base de datos
//pool servira para comenzar la conexion
pool.getConnection((err, conn) => {
    if (err) {
        if (err.code == 'PROTOCOL_CONNECTION_LOST') {
            console.error('LA CONEXIONES DE LA BASE DE DATOS FUE CERRADA');
        }
        if (err.code == 'ER_CON_COUNT_ERROR') {
            console.error('LA BASE DE DATOS TIENE MUCHAS CONEXIONES');
        }
        if (err.code == 'ECONNREFUSED') {
            console.error('LA CONEXIONES DE LA BASE DE DATOS FUE RECHAZADA');
        }
    }
    if (conn)
        conn.release();
    console.log('BD is Connected');
    return;
});
// esto es una promesa
pool.query = promisify(pool.query); // final
module.exports = pool;
