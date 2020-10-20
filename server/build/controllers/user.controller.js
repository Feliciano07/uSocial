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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const pool = require('../database');
class UserController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield pool.query('SELECT * FROM usuario');
            res.json(usuarios);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuario = yield pool.query('SELECT * FROM USUARIO WHERE id_usuario = ?', [id]);
            res.json(usuario);
        });
    }
    //INSERT INTO USUARIO values(1,'Luis Grijalva','chay','admin123','https://source.unsplash.com/random',0)
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            yield pool.query("INSERT INTO USUARIO(nombre,usuario,password,url_imagen,modo_bot) values(?,?,?,?,0)", [user.nombre, user.usuario, user.password, user.url_imagen]);
            res.status(201).send('ok');
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const logueado = yield pool.query('SELECT * FROM USUARIO WHERE usuario = ? AND password= ? ', [user.usuario, user.password]);
            res.json(logueado);
        });
    }
}
exports.userController = new UserController();