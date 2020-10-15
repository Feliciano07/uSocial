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
        this.router.get('/:id', user_controller_1.userController.list);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
