import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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

}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
