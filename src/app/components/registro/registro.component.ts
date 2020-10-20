import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuarios/usuario.service'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  focused = false;
  user:Usuario = {
    id_usuario: 0,
    nombre: "",
    usuario: "",
    password: "",
    url_imagen: "",
    modo_bot: 0
  }
  mensaje:boolean = false

  constructor(private router?: Router, private _usuario?: UsuarioService) { }
  ngOnInit(): void {}

  leave() { this.focused = false; }
  focus() { this.focused = true; }

  fileChangeEvent(files, event) {
    if (files.length === 0) {
      return;
    }
    console.log('files   ',files)
    console.log('event   ',event)
  }

  registrarse(){
    this._usuario.registrar(this.user).subscribe(
      res => {
        console.log(res)
        this.mensaje = true
      },
      err => console.error(err)
    )
  }

  irLogin(){
    this.router.navigate(['/login']);

  }
}
