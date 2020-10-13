import { Component, OnInit } from '@angular/core';

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


  constructor() { }

  ngOnInit(): void {
  }

}
