import {Request, Response} from 'express'

const pool = require('../database');

class IndexController {

    public async index(req: Request, res: Response){
        //const consulta = await pool.query('SELECT * FROM sales');
        res.status(200).send('ok')
    }
}
export const indexController = new IndexController();
