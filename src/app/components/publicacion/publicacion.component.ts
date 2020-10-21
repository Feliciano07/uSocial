import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/inicio.interface';
import { Usuario } from 'src/app/models/usuario';

import {PublicacionService} from '../../services/inicio/publicacion.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  public lista_publicacion: Array<Post> = [];
  public lista_aux: Array<Post> = [];
  public usuario: Usuario;

  constructor(private publicacionService: PublicacionService) { }

  ngOnInit(): void {
    this.get_user();
    this.Lista_Publicaciones();
  }

  get_user(){
    this.usuario = JSON.parse(localStorage.getItem('usuario'))[0];
    console.log(this.usuario);
  }

  Lista_Publicaciones(){
    var dara = {
      id_usuario: this.usuario.id_usuario
    };
    this.publicacionService.get_Publicaciones(dara).subscribe(
      res => {
        console.log(res);
        this.lista_publicacion = res;
        this.lista_aux = res;
      },
      err =>{
        console.log(err);
      }
    )
  }

  Filtras_Etiquetas(id_etiqueta: number){
    this.lista_publicacion = this.lista_aux;
    if(id_etiqueta === -1){
      this.Lista_Publicaciones();
    }else{
      this.lista_publicacion = this.lista_publicacion.filter( e => e.id_etiqueta ===id_etiqueta );
    }
  }

  Traducir(item: Post){
    var dato = {
      contenido: item.contenido
    }
    this.publicacionService.Traducir(dato).subscribe(
      res => {
        console.log(res);
        item.contenido = res.TranslatedText;
      }, 
      err => {
        console.log(err);
      }
    )
  }

}
