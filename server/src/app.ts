import express, {Application, urlencoded} from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routers/index.routes';
import userRoutes from './routers/user.routes';
import amigosRoutes from './routers/amigos.routes';
import postRoutes from './routers/post.routes';
export class App {


    private app: Application;

    constructor(private port?: number | string){
        this.app = express();
        this.settings();
        this.middlewares();
        this.route();
    }

    settings(): void{
        this.app.set('port', this.port || process.env.PORT || 3000 );

        this.app.use(cors());

                //cors
                this.app.use(function (req, res, next) {

                    // Website you wish to allow to connect
                    res.setHeader('Access-Control-Allow-Origin', '*');

                    // Request methods you wish to allow
                    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

                    // Request headers you wish to allow
                    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

                    // Set to true if you need the website to include cookies in the requests sent
                    // to the API (e.g. in case you use sessions)
                    res.setHeader('Access-Control-Allow-Credentials', 1);

                    // Pass to next layer of middleware
                    next();
                });
    }

    middlewares(): void{
        this.app.use(morgan('dev'));
        this.app.use(express.json({limit: '5mb'}));

        this.app.use(express.urlencoded({limit: '10mb',extended: false}));
    }

    route(){
        this.app.use('/index', indexRoutes)
        this.app.use('/user', userRoutes);
        this.app.use('/amigo', amigosRoutes);
        this.app.use('/publicacion', postRoutes)
    }

    async listen(){
        await this.app.listen(
            this.app.get('port')
        );
        console.log('Server on port', this.app.get('port'));
    }

}
