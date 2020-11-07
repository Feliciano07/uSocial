import {Request, Response} from 'express'
import AWS from 'aws-sdk';
const pool = require('../database');
const aws_keys = require('../aws/aws_keys');

class UserController {

    public async list(req: Request, res: Response){
        const usuarios = await pool.query('SELECT * FROM usuario');
        res.json(usuarios);
    }

    public async getOne(req: Request, res: Response): Promise<any>{
      const {id} = req.params;
      const usuario = await pool.query('SELECT * FROM USUARIO WHERE id_usuario = ?',[id]);
      res.json(usuario);
    }

    //INSERT INTO USUARIO values(1,'Luis Grijalva','chay','admin123','https://source.unsplash.com/random',0)
    public async create(req: Request, res: Response): Promise<any>{
      const {nombre, usuario, password, base64, extension} = req.body

      //Creacion del archivo en el bucket s3
      const timestamp = Date.now().toString();
      const filename = `imagen-${timestamp}.${extension}`;
      const array_base64 = base64.split(',');
      const decode_base64 = array_base64[1];
      let buff = Buffer.from(decode_base64, 'base64');
      const bucketname = 'proyecto2-7';
      const filepath = 'usuarios/'+filename;
      var paramS3 = {
          Bucket: bucketname,
          Key: filepath,
          Body: buff,//fileStream,
          ACL: 'public-read',
      }
      const S3 = new AWS.S3(aws_keys.s3);
      try {
        await S3.upload(paramS3).promise();
        var url_image = 'https://proyecto2-7.s3.us-east-2.amazonaws.com/usuarios/'+filename;


        try {
          let data = await pool.query("call nuevo_usuario (?,?,?,?)",[nombre,usuario,password,url_image]);
          // Guardar en cognito 
          const cognito = new AWS.CognitoIdentityServiceProvider(aws_keys.cognito);
          let id = data[0];
          var parms = {
            UserPoolId: 'us-east-2_GknZbOqTG',
            Username: id[0].id_usuario+'',
            UserAttributes: [
              {
                Name:'custom:nombre',
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
          await cognito.adminCreateUser(parms).promise();
          res.json({
            code: 200,
            body: 'correcto'
          });

        } catch (error) {
          console.log(error);
          res.json({
            code: 500,
            body: 'error'
          });
        }
          
        } catch (error) {
          console.log(error);
          res.json({
            code: 500,
            body: 'error'
          });
        }

      } catch (error) {
        console.log(error);
        res.json({
          code: 500,
          body: 'error'
        });
      }

    }


    public async login(req:Request, res:Response){
      const user = req.body
      const logueado = await pool.query('SELECT * FROM USUARIO WHERE usuario = ? AND password= ? ',[user.usuario,user.password]);
      res.json(logueado)
    }

    public async pool(req: Request, res: Response){

      const{nombre, password, modo_bot} = req.body;

      const cognito = new AWS.CognitoIdentityServiceProvider(aws_keys.cognito);

      var parms = {
        UserPoolId: 'us-east-2_GknZbOqTG',
        Username: 'Feliciano07',
        UserAttributes: [
          {
            Name:'custom:nombre',
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
        let data = await cognito.adminCreateUser(parms).promise();
        res.json(data);
      } catch (error) {
        res.json(error);
      }

    }


    public async Update_User(req: Request, res: Response){
      const{nombre, password, modo_bot, id_usuario, usuario} = req.body;

      try {
        await pool.query("UPDATE Usuario SET nombre = ?, usuario = ?, password = ?, modo_bot = ? WHERE id_usuario = ?",
        [nombre, usuario, password, modo_bot, id_usuario]);

        const cognito = new AWS.CognitoIdentityServiceProvider(aws_keys.cognito);
        var parms = {
          UserPoolId: 'us-east-2_GknZbOqTG',
          Username: id_usuario+"",
          UserAttributes: [
            {
              Name: 'custom:usuario',
              Value: usuario
            },
            {
              Name:'custom:nombre',
              Value: nombre
            },
            {
              Name: 'custom:password',
              Value: password
            },
            {
              Name: 'custom:modo_bot',
              Value: modo_bot+""
            }
          ],
          ClientMetadata: {
            'string': 'string'
          }
        };
        try {
          let data = await cognito.adminUpdateUserAttributes(parms).promise();
          res.json({
            code: 200,
            body: 'correcto'
          });
        } catch (error) {
          res.json(error);
        }

      } catch (error) {
        console.log(error);
      }
    }

}
export const userController = new UserController();
