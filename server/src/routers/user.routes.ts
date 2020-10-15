import {Router} from 'express';

import { userController } from '../controllers/user.controller';

class UserRoutes{
    public router = Router();

    constructor(){
      this.config();
    }

    config(){
      this.router.get('/', userController.list);
      this.router.get('/:id', userController.list);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
