import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuarios/usuario.service'

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

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

  photoSelected: string | ArrayBuffer; // para mostrar la previsualir
  private selectedFile: ImageSnippet; // manejar la imagen a subir

  constructor(private router?: Router, private _usuario?: UsuarioService) { }
  ngOnInit(): void {}

  leave() { this.focused = false; }
  focus() { this.focused = true; }

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


  registrarse(){

    var datos = {
      nombre: this.user.nombre,
      password: this.user.password,
      usuario: this.user.usuario,
      base64: this.selectedFile.src,
      extension: this.selectedFile.file.type.split('/')[1]
    }
    this._usuario.registrar(datos).subscribe(
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

  Limpiar(){
    this.user.nombre = '';
    this.user.usuario = '';
    this.user.password = '';
    this.photoSelected = '';
  }

}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}