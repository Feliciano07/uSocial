import express, {Application, urlencoded} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import socketIo from 'socket.io';
import { Message } from "./model";

import indexRoutes from './routers/index.routes';
import userRoutes from './routers/user.routes';
import amigosRoutes from './routers/amigos.routes';
import postRoutes from './routers/post.routes';

export class App {
    private app: Application;
    private server: http.Server;
    private io: SocketIO.Server;

    constructor(private port?: number | string){
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketIo(this.server);
        this.settings();
        this.middlewares();
        this.route();
    }

    private settings(): void{
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

    private middlewares(): void{
        this.app.use(morgan('dev'));
        this.app.use(express.json({limit : '50mb'}));
        this.app.use(express.urlencoded({extended : true, limit : '50mb'}));
    }

    private route(){
        this.app.use('/index', indexRoutes)
        this.app.use('/user', userRoutes);
        this.app.use('/amigo', amigosRoutes);
        this.app.use('/publicacion', postRoutes)
    }

    private saveMsg(emisor : string, receptor : string, text : string){
      /*Chat.updateOne(
          { $or : [{ user1 : emisor, user2 : receptor}, {user1 : receptor, user2 : emisor}]},
          {$push : {messages : {emisor : emisor, text : text}}}
      ).then((data)=>{
          console.log("SaveMsg: ",data);
      }).catch((err)=>{
          console.error("ErrorMsg: ",err);
      });*/
    }

    async listen(){
      //Socket
      let users : Array<Array<string>> = [];

        this.server.listen(this.app.get('port'), () => {
          console.log(`App listening on port ${this.app.get('port')}`);
        });

        this.io.on('connection',(socket : any)=>{
          console.log('a user connected');

          socket.on("message", (message: any) => {
            console.log('message: ', message);
            if(users[message.to] != null && users[message.to] != undefined){
              console.log("yes");
              users[message.to].forEach((user)=>{
                console.log("Yes again",user);
                this.io.to(user).emit('message',message);
              });
            }
            this.saveMsg(message.from,message.to,message.text);
          });

          socket.on('handshake',(user:any)=>{
            console.log('Handshake: ',user);
            if(users[user] === undefined || users[user] === null){
              users[user] = [];
            }
            users[user][0] = socket.id;
            console.log(users);
          });

          socket.on('disconnect', (user:any) => {
            console.log('user disconnected: ',user);
          });
        });
    }

}
