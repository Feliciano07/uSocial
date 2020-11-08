# USocial

## Autores ✒️
- Grupo **7**
- [Gerado Chay](https://github.com/gerchay) - 201700345
- [Fernando Feliciano](https://github.com/Feliciano07) - 201701089


## Herramientas API server y Serveles 🚀

### API server 
para la implementacion del servidor se utilizaron las siguientes herramientas.

- [NodeJS](https://nodejs.org/es/download)
  - Express
  - Cors
  - Morgan
```
npm init
```
- [TypeScript](https://www.typescriptlang.org/)
```
npm install -g typescript
```
- [PM2](https://pm2.keymetrics.io/)
```
npm install pm2 -g
```


## Usuarios IAM 🤓
- Administrador_201701089

_Usuario creado para el manejo rekognition, cognito, Bucket S3, Translate

- Administrador_201700345

_Usuario creado para la creación de las instancias EC2, VPV y CloudFormation

## Roles IAM
- polly-grupo7-role-qs7chh96 

_Rol para poder Administrar grupos de usuario

## Arquitectura 
![imagen](https://user-images.githubusercontent.com/47803124/98458995-d721f700-215b-11eb-9319-e1647d1f21c8.png)


## VPC
- Nombre vpc: VPC-G7
- Nombre subred public: public_subnet_1_g7
- Nombre subred privada: private_subnet_1_g7
- Tabla de routeo publica: public_rt1_g7
- Tabla de routeo privada: private_rt1_g7
- Internet Gateway: igw_g7

