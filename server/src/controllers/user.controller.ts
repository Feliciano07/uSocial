import {Request, Response} from 'express'

const pool = require('../database');

class UserController {

    public async list(req: Request, res: Response){
        const usuarios = await pool.query('SELECT * FROM usuario');
        res.json(usuarios);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
      const {id} = req.params;
      const usuario = await pool.query('SELECT * FROM USUARIO WHERE cod_usuario = ?',[id]);
      res.json(usuario);
    }

    //INSERT INTO USUARIO values(1,'Luis Grijalva','chay','admin123','https://source.unsplash.com/random',0)
}
export const userController = new UserController();
