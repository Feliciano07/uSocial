import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  APIT_URI = 'http://localhost:3000/user';

  logIn = (loguearse:any):Observable<Usuario> => this.http.post(`${this.APIT_URI}/login`,loguearse)
  registrar = (nuevo:Usuario) => this.http.post(this.APIT_URI,nuevo)
}
