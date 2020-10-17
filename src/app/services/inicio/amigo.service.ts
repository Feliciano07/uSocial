import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {No_Amigos} from '../../models/inicio.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmigoService {

  constructor(private http: HttpClient) { }

  APIT_URI = 'http://localhost:3000/amigo';

  No_Amigos(usuario: any):Observable<Array<No_Amigos>>{
    return this.http.post<Array<No_Amigos>>(`${this.APIT_URI}/no-amigos`, usuario);
  }

  Agregar_Amigos(relacion: any){
    return this.http.post(`${this.APIT_URI}/agg`, relacion);
  }

}
