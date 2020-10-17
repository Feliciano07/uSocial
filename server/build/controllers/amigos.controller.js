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
exports.amigosController = void 0;
const pool = require('../database');
class AmigosController {
    No_amigos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.body;
            const materia = yield pool.query('call no_amigos (?)', [id_usuario]);
            res.json(materia[0]);
        });
    }
    Agg_Amigos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario, nuevo_amigo } = req.body;
            yield pool.query('call agg_amigos (?, ?)', [id_usuario, nuevo_amigo]);
            res.json({
                code: 200,
                text: 'nuevo amigo'
            });
        });
    }
}
exports.amigosController = new AmigosController();
