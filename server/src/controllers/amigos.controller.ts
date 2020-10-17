import {Request, Response} from 'express';
const pool = require('../database');

class AmigosController{

    public async No_amigos(req: Request, res: Response){
        const {id_usuario}  = req.body;
        const materia = await  pool.query('call no_amigos (?)', [id_usuario]);
        res.json(materia[0]);
    }

    public async Agg_Amigos(req: Request, res: Response){
        const {id_usuario, nuevo_amigo} = req.body;

        await pool.query('call agg_amigos (?, ?)', [id_usuario, nuevo_amigo]);

        res.json({
            code: 200,
            text: 'nuevo amigo'
        })
    }
}

export const amigosController = new AmigosController();