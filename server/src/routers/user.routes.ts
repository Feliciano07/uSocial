import {Router} from 'express';

import { userController } from '../controllers/user.controller';

class UserRoutes{
    public router = Router();

    constructor(){
      this.config();
    }

    config(){
      this.router.get('/', userController.list);
      this.router.get('/:id', userController.getOne);
      this.router.post('/', userController.create);
      this.router.post('/login', userController.login);

      //this.router.post('/cog', userController.pool);
      this.router.post('/update', userController.Update_User);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
