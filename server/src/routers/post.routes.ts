import {Router} from 'express'
import {postController} from '../controllers/post.controller';


class PostRoutes{
    public router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.get('/', postController.index);
        this.router.post('/new', postController.Nueva_Publicacion);
        this.router.post('/todo', postController.Todo);
        this.router.post('/etiquetas', postController.Etiquetas);
        this.router.post('/traducir', postController.Traducir);
    }
}

const postRoutes = new PostRoutes();

export default postRoutes.router;

