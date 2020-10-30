"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    database: {
        host: process.env.HOST_DB || 'localhost',
        user: process.env.USER_DB,
        password: process.env.PWD_DB,
        database: 'red',
        port: 3306,
        connectionLimit: 10
    }
};
