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
exports.userController = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const pool = require('../database');
const aws_keys = require('../aws/aws_keys');
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
            const { nombre, usuario, password, base64, extension } = req.body;
            //Creacion del archivo en el bucket s3
            const timestamp = Date.now().toString();
            const filename = `imagen-${timestamp}.${extension}`;
            const array_base64 = base64.split(',');
            const decode_base64 = array_base64[1];
            let buff = Buffer.from(decode_base64, 'base64');
            const bucketname = 'proyecto2-7';
            const filepath = 'usuarios/' + filename;
            var paramS3 = {
                Bucket: bucketname,
                Key: filepath,
                Body: buff,
                ACL: 'public-read',
            };
            const S3 = new aws_sdk_1.default.S3(aws_keys.s3);
            try {
                yield S3.upload(paramS3).promise();
                var url_image = 'https://proyecto2-7.s3.us-east-2.amazonaws.com/usuarios/' + filename;
                try {
                    let data = yield pool.query("call nuevo_usuario (?,?,?,?)", [nombre, usuario, password, url_image]);
                    // Guardar en cognito 
                    const cognito = new aws_sdk_1.default.CognitoIdentityServiceProvider(aws_keys.cognito);
                    let id = data[0];
                    var parms = {
                        UserPoolId: 'us-east-2_GknZbOqTG',
                        Username: id[0].id_usuario + '',
                        UserAttributes: [
                            {
                                Name: 'custom:nombre',
                                Value: nombre
                            },
                            {
                                Name: 'custom:usuario',
                                Value: usuario
                            },
                            {
                                Name: 'custom:password',
                                Value: password
                            },
                            {
                                Name: 'custom:modo_bot',
                                Value: "0"
                            }
                        ],
                        ClientMetadata: {
                            'string': 'string'
                        }
                    };
                    try {
                        yield cognito.adminCreateUser(parms).promise();
                        res.json({
                            code: 200,
                            body: 'correcto'
                        });
                    }
                    catch (error) {
                        console.log(error);
                        res.json({
                            code: 500,
                            body: 'error'
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                    res.json({
                        code: 500,
                        body: 'error'
                    });
                }
            }
            catch (error) {
                console.log(error);
                res.json({
                    code: 500,
                    body: 'error'
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const logueado = yield pool.query('SELECT * FROM USUARIO WHERE usuario = ? AND password= ? ', [user.usuario, user.password]);
            res.json(logueado);
        });
    }
    pool(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, password, modo_bot } = req.body;
            const cognito = new aws_sdk_1.default.CognitoIdentityServiceProvider(aws_keys.cognito);
            var parms = {
                UserPoolId: 'us-east-2_GknZbOqTG',
                Username: 'Feliciano07',
                UserAttributes: [
                    {
                        Name: 'custom:nombre',
                        Value: nombre
                    },
                    {
                        Name: 'custom:password',
                        Value: password
                    },
                    {
                        Name: 'custom:modo_bot',
                        Value: modo_bot
                    }
                ],
                ClientMetadata: {
                    'string': 'string'
                }
            };
            try {
                let data = yield cognito.adminCreateUser(parms).promise();
                res.json(data);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    Update_User(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, password, modo_bot, id_usuario, usuario } = req.body;
            try {
                yield pool.query("UPDATE Usuario SET nombre = ?, usuario = ?, password = ?, modo_bot = ? WHERE id_usuario = ?", [nombre, usuario, password, modo_bot, id_usuario]);
                const cognito = new aws_sdk_1.default.CognitoIdentityServiceProvider(aws_keys.cognito);
                var parms = {
                    UserPoolId: 'us-east-2_GknZbOqTG',
                    Username: id_usuario + "",
                    UserAttributes: [
                        {
                            Name: 'custom:usuario',
                            Value: usuario
                        },
                        {
                            Name: 'custom:nombre',
                            Value: nombre
                        },
                        {
                            Name: 'custom:password',
                            Value: password
                        },
                        {
                            Name: 'custom:modo_bot',
                            Value: modo_bot + ""
                        }
                    ],
                    ClientMetadata: {
                        'string': 'string'
                    }
                };
                try {
                    let data = yield cognito.adminUpdateUserAttributes(parms).promise();
                    res.json({
                        code: 200,
                        body: 'correcto'
                    });
                }
                catch (error) {
                    res.json(error);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.userController = new UserController();
