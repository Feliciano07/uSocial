import mysql from 'mysql';
import keys from './keys';
const { promisify } = require('util'); //final
const pool = mysql.createPool(keys.database);//modulo de conexion de la base de datos
//pool servira para comenzar la conexion
pool.getConnection((err, conn) =>{
  if (err) {
      if (err.code == 'PROTOCOL_CONNECTION_LOST'){
          console.error('LA CONEXIONES DE LA BASE DE DATOS FUE CERRADA');
      }
     if(err.code == 'ER_CON_COUNT_ERROR') {
          console.error('LA BASE DE DATOS TIENE MUCHAS CONEXIONES');
     }
     if (err.code == 'ECONNREFUSED') {
         console.error('LA CONEXIONES DE LA BASE DE DATOS FUE RECHAZADA');
     }
  }
  if (conn) conn.release();
  console.log('BD is Connected');
  return;
});

// esto es una promesa
pool.query = promisify(pool.query); // final

module.exports  = pool;
