"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessage = exports.Message = exports.User = void 0;
class User {
    constructor(name) {
        this.name = name;
    }
}
exports.User = User;
class Message {
    constructor(from, content) {
        this.from = from;
        this.content = content;
    }
}
exports.Message = Message;
class ChatMessage extends Message {
    constructor(from, content) {
        super(from, content);
    }
}
exports.ChatMessage = ChatMessage;
