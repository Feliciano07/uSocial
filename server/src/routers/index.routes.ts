import {Router} from 'express';

import {indexController} from '../controllers/index.controller';

class IndexRoutes{
    public router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', indexController.index);
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;