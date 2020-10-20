import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuarios/usuario.service'
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = { usuario: '', password: ''  }

  constructor(private router?: Router, private _usuario?: UsuarioService) { }
  ngOnInit(): void { }

  ingresar(){
    this._usuario.logIn(this.user).subscribe(
      (res:Usuario) => {
        localStorage.setItem('usuario', JSON.stringify(res));
        this.router.navigate(['/inicio']);
      },
      err => console.error(err)
    )
  }
}
