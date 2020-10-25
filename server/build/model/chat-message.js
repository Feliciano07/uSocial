"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessage = void 0;
const _1 = require("./");
class ChatMessage extends _1.Message {
    constructor(from, content) {
        super(from, content);
    }
}
exports.ChatMessage = ChatMessage;
