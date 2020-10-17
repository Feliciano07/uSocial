"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const amigos_controller_1 = require("../controllers/amigos.controller");
class AmigosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/no-amigos', amigos_controller_1.amigosController.No_amigos);
        this.router.post('/agg', amigos_controller_1.amigosController.Agg_Amigos);
    }
}
const amigosRoutes = new AmigosRoutes();
exports.default = amigosRoutes.router;
