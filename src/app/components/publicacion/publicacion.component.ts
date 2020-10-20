import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/inicio.interface';

import {PublicacionService} from '../../services/inicio/publicacion.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  public lista_publicacion: Array<Post> = [];
  public lista_aux: Array<Post> = [];

  constructor(private publicacionService: PublicacionService) { }

  ngOnInit(): void {
    this.Lista_Publicaciones();
  }

  Lista_Publicaciones(){
    var dara = {
      id_usuario: 4
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
      console.log('todas');
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
