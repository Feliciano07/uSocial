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
exports.postController = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const pool = require('../database');
const aws_keys = require('../aws/aws_keys');
class PostController {
    index(req, res) {
        res.json({
            message: 'hola bebe'
        });
    }
    Nueva_Publicacion(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario, base64, extension, contenido } = req.body;
            //Creacion del archivo 
            const timestamp = Date.now().toString();
            const filename = `imagen-${timestamp}.${extension}`;
            const array_base64 = base64.split(',');
            const decode_base64 = array_base64[1];
            let buff = Buffer.from(decode_base64, 'base64');
            const bucketname = 'proyecto2-7';
            const filepath = 'publicaciones/' + filename;
            var paramS3 = {
                Bucket: bucketname,
                Key: filepath,
                Body: buff,
                ACL: 'public-read',
            };
            const S3 = new aws_sdk_1.default.S3(aws_keys.s3);
            try {
                let res_s3 = yield S3.upload(paramS3).promise();
                var url_image = 'https://proyecto2-7.s3.us-east-2.amazonaws.com/publicaciones/' + filename;
                const rekognition = new aws_sdk_1.default.Rekognition(aws_keys.rekognition);
                const imagen = {
                    Image: {
                        S3Object: {
                            Bucket: bucketname,
                            Name: filepath
                        },
                    },
                    MaxLabels: 1,
                    MinConfidence: 75
                };
                let label = yield rekognition.detectLabels(imagen).promise();
                var label_name;
                (_a = label.Labels) === null || _a === void 0 ? void 0 : _a.forEach(e => {
                    label_name = e.Name;
                });
                if (label_name == undefined) {
                    label_name = 'Varios';
                }
                //base de datos
                const base = {
                    id_usuario: id_usuario,
                    url_imagen: url_image,
                    contenido: contenido,
                    label: label_name
                };
                try {
                    yield pool.query('call new_publicacion (?, ?, ?, ?)', [base.id_usuario, base.url_imagen, base.contenido, base.label]);
                    res.json({
                        code: 200,
                        body: 'Nueva publicacion'
                    });
                }
                catch (error) {
                    res.json({
                        code: 500,
                        body: error
                    });
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    Todo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.body;
            const todo = yield pool.query('call publicaciones (?)', [id_usuario]);
            res.json(todo[0]);
        });
    }
}
exports.postController = new PostController();
