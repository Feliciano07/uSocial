import { Component, OnInit } from '@angular/core';
import { No_Amigos } from 'src/app/models/inicio.interface';
import { Usuario } from 'src/app/models/usuario';

import {AmigoService} from '../../services/inicio/amigo.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  public lista_usuarios:Array<No_Amigos> = [];
  public usuario: Usuario;

  constructor(private amigoService: AmigoService) { }

  ngOnInit(): void {
    this.get_user();
    this.Obtener_Usuarios();
  }

  Obtener_Usuarios(){
    let data  = {
      id_usuario: 4
    }
    this.amigoService.No_Amigos(data).subscribe(
      res => {
        this.lista_usuarios = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  Agg_Amigo(item: No_Amigos){
    let data = {
      id_usuario: this.usuario.id_usuario,
      nuevo_amigo: item.id_usuario
    }
    this.amigoService.Agregar_Amigos(data).subscribe(
      res => {
        console.log(res);
        this.Obtener_Usuarios();
      },
      err => {
        console.log(err);
      }
    )
  }

  get_user(){
    this.usuario = JSON.parse(localStorage.getItem('usuario'))[0];
    console.log(this.usuario);
  }

}
