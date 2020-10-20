import {Request, Response} from 'express';
import AWS from 'aws-sdk';
const pool = require('../database');
const aws_keys = require('../aws/aws_keys');

class PostController {

    public index (req: Request, res: Response){
        res.json({
            message: 'hola bebe'
        })
    }

    public async Nueva_Publicacion(req: Request, res: Response){
        const {id_usuario, base64, extension, contenido} = req.body;

        //Creacion del archivo 
        const timestamp = Date.now().toString();
        const filename = `imagen-${timestamp}.${extension}`;
        
        const array_base64 = base64.split(',');
        const decode_base64 = array_base64[1];

        let buff = Buffer.from(decode_base64, 'base64');

        const bucketname = 'proyecto2-7';
        const filepath = 'publicaciones/'+filename;

        var paramS3 = {
            Bucket: bucketname,
            Key: filepath,
            Body: buff,//fileStream,
            ACL: 'public-read',
        }

        const S3 = new AWS.S3(aws_keys.s3);

        try {
            let res_s3 = await S3.upload(paramS3).promise();
            var url_image = 'https://proyecto2-7.s3.us-east-2.amazonaws.com/publicaciones/'+filename;
            const rekognition = new AWS.Rekognition(aws_keys.rekognition);
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
            let label = await rekognition.detectLabels(imagen).promise();

            var label_name;
            label.Labels?.forEach(e => {
                label_name = e.Name;
            });

            if(label_name == undefined){
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
                await pool.query('call new_publicacion (?, ?, ?, ?)',[base.id_usuario, base.url_imagen, base.contenido, base.label]);
                res.json({
                    code: 200,
                    body: 'Nueva publicacion'
                });
            } catch (error) {
                res.json({
                    code: 500,
                    body: error
                });
            }

        } catch (error) {
            console.error(error);
        }

    }


    public async Todo(req: Request, res: Response){
        const {id_usuario} = req.body;
        const todo = await pool.query('call publicaciones (?)', [id_usuario]);
        res.json(todo[0]);
    }

}


export const postController = new PostController();