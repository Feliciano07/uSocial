import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Etiquetas, Post, traductor} from '../../models/inicio.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  APIT_URI = 'http://18.221.116.251:3000/publicacion';
  
  constructor(private http: HttpClient) { }

  new_post(publicacion){
    return this.http.post(`${this.APIT_URI}/new`, publicacion);
  }

  get_Publicaciones(user): Observable<Array<Post>>{
    return this.http.post<Array<Post>>(`${this.APIT_URI}/todo`, user);
  }

  get_Etiquetas(user): Observable<Array<Etiquetas>>{
    return this.http.post<Array<Etiquetas>>(`${this.APIT_URI}/etiquetas`, user);
  }

  Traducir(texto): Observable<traductor>{
    return this.http.post<traductor>(`${this.APIT_URI}/traducir`, texto);
  }

}
