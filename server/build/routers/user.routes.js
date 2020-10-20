"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', user_controller_1.userController.list);
        this.router.get('/:id', user_controller_1.userController.getOne);
        this.router.post('/', user_controller_1.userController.create);
        this.router.post('/login', user_controller_1.userController.login);
        this.router.post('/cog', user_controller_1.userController.pool);
        this.router.post('/update', user_controller_1.userController.Update_User);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
