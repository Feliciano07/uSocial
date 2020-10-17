import { Component, OnInit } from '@angular/core';
import { No_Amigos } from 'src/app/models/inicio.interface';

import {AmigoService} from '../../services/inicio/amigo.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  public lista_usuarios:Array<No_Amigos> = [];

  constructor(private amigoService: AmigoService) { }

  ngOnInit(): void {
    this.Obtener_Usuarios();
  }

  Obtener_Usuarios(){
    let data  = {
      id_usuario: this.Logueado()
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
      id_usuario: this.Logueado(),
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

  Logueado(): any{
    let user = JSON.parse(localStorage.getItem('usuario'));
    return user.id_usuario;
  }

}
