import { Component, ContentChildDecorator, OnInit } from '@angular/core';
import {PublicacionService} from '../../services/inicio/publicacion.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public lista_categorias: any = [
    {nombre: 'gato'},
    {nombre: 'playa'},
    {nombre: 'zapatosdddddddddddddddddddddddddddddddddd'}
  ];

  public usuario = {
    id_usuario: 4,
    nombre: "Fernando Chajon",
    url_imagen: 'https://source.unsplash.com/random'
  }

  
  photoSelected: string | ArrayBuffer; // para mostrar la previsualir
  private selectedFile: ImageSnippet; // manejar la imagen a subir
  public contenido: string;

  constructor(private publicacionService: PublicacionService) { }

  ngOnInit(): void {
    this.Loguear();
  }

  //Todo: sera funcion solo para guardar el usuario
  Loguear(){
    localStorage.clear();
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  // Seleccionar fotos
  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      const file:File = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(file);

      reader.addEventListener('load', (even: any) => {
        this.selectedFile = new ImageSnippet(even.target.result, file);
      })


    }
  }

  nueva_publicacion (){
    var datos = {
      id_usuario: this.usuario.id_usuario,
      base64: this.selectedFile.src,
      extension: this.selectedFile.file.type.split('/')[1],
      contenido: this.contenido
    }

    this.publicacionService.new_post(datos).subscribe(
      res => {
        console.log(res);
        this.Limpiar();
      },
      err => {
        console.log(err);
      }
    )
  }

  Limpiar(){
    this.contenido = '';
    this.photoSelected = '';
  }

}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
