import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import { Message } from '../../models/message';
import { Event } from '../../models/event';
import {Mensaje, Salas} from '../../models/salas';
import {HttpClient} from '@angular/common/http';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://18.221.116.251:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket = socketIo("http://18.221.116.251:3000");

  private API_URI = 'http://18.221.116.251:3000/amigo';

  constructor(private http: HttpClient) { }


  joinRoom(data){
    this.socket.emit('join', data); // send room chat
  }

  newUserJoined(){
    const observable = new Observable<Mensaje>(observer => {

      this.socket.on('new user joined', (data) => {
          observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
}

  SendMessage(data){
    this.socket.emit('message', data);
  }

  newMessageReceived(){
    const observable = new Observable<Mensaje>(observer => {

      this.socket.on('new:message', (data) => {
          observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
  }

  get_salas(usuario): Observable<Array<Salas>>{
    return this.http.post<Array<Salas>>(`${this.API_URI}/salas`, usuario);
  }

  get_Mensajes(sala): Observable<Array<Mensaje>>{
    return this.http.post<Array<Mensaje>>(`${this.API_URI}/mensaje`, sala);
  }

}
