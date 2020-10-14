import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  public lista_publiacion: any = [
    {
      id: 0,
      url_imagen: "https://i.ytimg.com/vi/2GPJ9L6x-Is/maxresdefault.jpg",
      contenido: "Hola esto es angular",
      usuario: "Fernando",
      imagen: "https://www.cavsi.com/preguntasrespuestas/images/que-es-usuario.jpg"
  },
  {
      id: 1,
      url_imagen: "https://i.ytimg.com/vi/2GPJ9L6x-Is/maxresdefault.jpg",
      contenido: "",
      usuario: "Fernando",
      imagen: "https://www.cavsi.com/preguntasrespuestas/images/que-es-usuario.jpg"
  },
  {
      id: 2,
      url_imagen: "https://i.ytimg.com/vi/2GPJ9L6x-Is/maxresdefault.jpg",
      contenido: "Hola esto es angular",
      usuario: "Fernando",
      imagen: "https://www.cavsi.com/preguntasrespuestas/images/que-es-usuario.jpg"
  },
  {
      id: 3,
      url_imagen: "https://i.ytimg.com/vi/2GPJ9L6x-Is/maxresdefault.jpg",
      contenido: "",
      usuario: "Fernando",
      imagen: "https://www.cavsi.com/preguntasrespuestas/images/que-es-usuario.jpg"
  },
  {
      id: 4,
      url_imagen: "https://i.ytimg.com/vi/2GPJ9L6x-Is/maxresdefault.jpg",
      contenido: "Hola esto es angular",
      usuario: "Fernando",
      imagen: "https://www.cavsi.com/preguntasrespuestas/images/que-es-usuario.jpg"
  }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
