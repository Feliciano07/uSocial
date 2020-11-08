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
        });
    }

    public async getSalas(req: Request, res: Response){
        const {id_usuario} = req.body;

        const salas = await pool.query('call obtener_salas(?)', [id_usuario]);

        res.json(salas[0]);

    }

    public async Mensajes(req: Request, res: Response){
        const {id_sala} = req.body;
        const mensajes = await pool.query("SELECT * FROM mensaje WHERE id_sala = ?", [id_sala]);
        //console.log(mensajes);
        res.json(mensajes);
    }
    
}

export const amigosController = new AmigosController();