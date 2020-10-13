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

  
  photoSelected: string | ArrayBuffer; // para mostrar la previsualir
  private selectedFile: ImageSnippet; // manejar la imagen a subir

  constructor() { }

  ngOnInit(): void {
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
