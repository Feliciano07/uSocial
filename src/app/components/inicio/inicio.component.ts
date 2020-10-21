import { Component, ContentChildDecorator, OnInit } from '@angular/core';
import { Etiquetas } from 'src/app/models/inicio.interface';
import { Usuario } from 'src/app/models/usuario';
import {PublicacionService} from '../../services/inicio/publicacion.service';
import {UsuarioService} from '../../services/usuarios/usuario.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public lista_categorias: Array<Etiquetas> = [];
  public etiqueta = -1;

  public usuario: Usuario;
  public aux: Usuario;

  
  photoSelected: string | ArrayBuffer; // para mostrar la previsualir
  private selectedFile: ImageSnippet; // manejar la imagen a subir
  public contenido: string;

  public prueba;

  public check: any = {
    value1: '1',
    password: ''
  }

  constructor(private publicacionService: PublicacionService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.get_user();
    this.Lista_Etiquetas();
  }


  //funcion que obtiene el usuario
  get_user(){
    this.usuario = JSON.parse(localStorage.getItem('usuario'))[0];
    this.aux = this.usuario;
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

  Lista_Etiquetas(){
    var datos = {
      id_usuario: this.usuario.id_usuario
    };
    this.publicacionService.get_Etiquetas(datos).subscribe(
      res =>{
        console.log(res);
        this.lista_categorias = res;
      },
      err =>{
        console.log(err);
      }
    )
  }

  Actualizar_Valores(){
    var data = {
      nombre: this.aux.nombre,
      usuario: this.aux.usuario,
      password: this.check.password,
      id_usuario: this.aux.id_usuario,
      modo_bot: parseInt(this.check.value1)
    }

    this.usuarioService.update(data).subscribe(
      res => {
        console.log(res);
        this.Actualizar_usuario(data.usuario, data.password);
      },
      err => {
        console.log(err);
      }
    )
  }

  Actualizar_usuario(usuario: any, pass: any){
    var dat_login = {
      usuario: usuario,
      password: pass
    }
    this.usuarioService.logIn(dat_login).subscribe(
      (res:Usuario) => {
        localStorage.clear();
        localStorage.setItem('usuario', JSON.stringify(res));
        this.get_user();
        console.log(this.usuario);
      },
      err => console.error(err)
    )
  }

  Reestablecer(){
    this.aux = this.usuario;
    this.check.value1 = this.aux.modo_bot.toString();
    this.check.password = '';
  }

  Limpiar(){
    this.contenido = '';
    this.photoSelected = '';
  }

}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
