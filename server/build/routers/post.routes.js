"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
class PostRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', post_controller_1.postController.index);
        this.router.post('/new', post_controller_1.postController.Nueva_Publicacion);
        this.router.post('/todo', post_controller_1.postController.Todo);
        this.router.post('/etiquetas', post_controller_1.postController.Etiquetas);
    }
}
const postRoutes = new PostRoutes();
exports.default = postRoutes.router;
