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
      const user = req.body
      await pool.query("INSERT INTO USUARIO(nombre,usuario,password,url_imagen,modo_bot) values(?,?,?,?,0)",[user.nombre,user.usuario,user.password,user.url_imagen]);
      res.status(201).send('ok')
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


}
export const userController = new UserController();
