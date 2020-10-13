import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  public lista_usuarios:any = [
    {usuario: 'Fernando Chajon del Cid', imagen: 'https://www.cavsi.com/preguntasrespuestas/images/que-es-usuario.jpg'},
    {usuario: 'Fernando Chajon', imagen: 'https://www.cavsi.com/preguntasrespuestas/images/que-es-usuario.jpg'},
    {usuario: 'Fernando Chajon', imagen: 'https://www.cavsi.com/preguntasrespuestas/images/que-es-usuario.jpg'},
    {usuario: 'Fernando Chajon', imagen: 'https://www.cavsi.com/preguntasrespuestas/images/que-es-usuario.jpg'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
