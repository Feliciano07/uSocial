export default{//encargado de la configuracion de db

  database:{
      host: process.env.HOST_DB || 'localhost',
      user: process.env.USER_DB,
      password: process.env.PWD_DB,
      database: 'red', //creo que el proyecto2
      port: 3306,
      connectionLimit : 10
  }
}
