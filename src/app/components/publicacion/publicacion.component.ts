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
      },
      err =>{
        console.log(err);
      }
    )
  }

}
