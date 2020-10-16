import {Router} from 'express';
import {amigosController} from '../controllers/amigos.controller';

class AmigosRoutes{
    
    public router = Router();

    constructor(){
        this.config();   
    }

    config(){
        this.router.post('/no-amigos', amigosController.No_amigos);
        this.router.post('/agg', amigosController.Agg_Amigos);
    }
}

const amigosRoutes = new AmigosRoutes();
export default amigosRoutes.router;