"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const index_routes_1 = __importDefault(require("./routers/index.routes"));
const user_routes_1 = __importDefault(require("./routers/user.routes"));
const amigos_routes_1 = __importDefault(require("./routers/amigos.routes"));
const post_routes_1 = __importDefault(require("./routers/post.routes"));
const pool = require('./database');
class App {
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
        this.server = http_1.default.createServer(this.app);
        this.io = socket_io_1.default(this.server);
        this.settings();
        this.middlewares();
        this.route();
    }
    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
        this.app.use(cors_1.default());
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
    middlewares() {
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json({ limit: '50mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
    }
    route() {
        this.app.use('/index', index_routes_1.default);
        this.app.use('/user', user_routes_1.default);
        this.app.use('/amigo', amigos_routes_1.default);
        this.app.use('/publicacion', post_routes_1.default);
    }
    saveMsg(emisor, receptor, text) {
        /*Chat.updateOne(
            { $or : [{ user1 : emisor, user2 : receptor}, {user1 : receptor, user2 : emisor}]},
            {$push : {messages : {emisor : emisor, text : text}}}
        ).then((data)=>{
            console.log("SaveMsg: ",data);
        }).catch((err)=>{
            console.error("ErrorMsg: ",err);
        });*/
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.listen(this.app.get('port'), () => {
                console.log(`App listening on port ${this.app.get('port')}`);
            });
            this.io.on('connection', (socket) => {
                console.log('new connection made.', socket.id);
                // event on is for listen(escucha)
                socket.on('join', (data) => {
                    // event emit is for emit(emite)
                    socket.join(data.id_sala); // set room donde se va mandar
                    console.log(data.nombre + ' joined the room: ' + data.id_sala);
                    // this.io.sockets.emit('chat',data);
                    socket.broadcast.to(data.id_sala).emit('new user joined', {
                        id_usuario: data.id_usuario,
                        mensaje: data.nombre + ' esta conectado',
                        fecha: new Date()
                    });
                });
                // message 
                socket.on('message', (data) => {
                    //console.log(data.nombre + 'dijo: ' +data.mensaje)
                    this.io.in(data.id_sala).emit('new:message', {
                        id_usuario: data.id_usuario,
                        mensaje: data.mensaje,
                        fecha: new Date()
                    });
                    save_mensaje(data.id_usuario, data.id_sala, data.mensaje);
                });
            });
        });
    }
}
exports.App = App;
function save_mensaje(id_usuario, id_sala, mensaje) {
    return __awaiter(this, void 0, void 0, function* () {
        yield pool.query('INSERT INTO MENSAJE(mensaje,id_usuario,id_sala) VALUES(?,?,?)', [mensaje, id_usuario, id_sala]);
    });
}
