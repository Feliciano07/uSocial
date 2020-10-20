import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../../models/inicio.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  APIT_URI = 'http://localhost:3000/publicacion';
  
  constructor(private http: HttpClient) { }

  new_post(publicacion){
    return this.http.post(`${this.APIT_URI}/new`, publicacion);
  }

  get_Publicaciones(user): Observable<Array<Post>>{
    return this.http.post<Array<Post>>(`${this.APIT_URI}/todo`, user);
  }

}
