import { Component, OnInit } from '@angular/core';
import { Salas, Mensaje } from 'src/app/models/salas';
import {SocketService} from '../../services/chat/socket.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public channelList: Array<Salas> = [];
  public channel: Salas;
  public newMessage = ''
  username = '';
  title = 'angular-chat';

  public messages: Array<Mensaje> = [];

  public usuario: Usuario;



  constructor(private chatService: SocketService) {
    
   }

  ngOnInit(): void {
    this.get_user();
    this.Listar_Salas();

    this.chatService.newUserJoined()
    .subscribe(data => this.messages.push(data));

    this.chatService.newMessageReceived()
    .subscribe(data => this.messages.push(data));

    //this.join();
  }

  // obtener usuario
  get_user(){
    this.usuario = JSON.parse(localStorage.getItem('usuario'))[0];
    //console.log(this.usuario);
  }

  Listar_Salas(){
    var data = {
      id_usuario: this.usuario.id_usuario
    }
    this.chatService.get_salas(data).subscribe(
      res =>{
        //console.log(res);
        this.channelList = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  Obtener_Mensajes(item: Salas){
    this.channel = item;
    var data = {
      id_sala: item.id_sala
    }
    this.chatService.get_Mensajes(data).subscribe(
      res =>{
        this.messages = res;
        this.join();
        //console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }


  join(){
    this.chatService.joinRoom({
      nombre: this.usuario.usuario,
      id_sala: this.channel.id_sala,
      id_usuario: this.usuario.id_usuario
    });
  }

  sendMessage(){
    this.chatService.SendMessage({
        nombre: this.usuario.usuario,
        id_sala: this.channel.id_sala,
        mensaje: this.newMessage,
        id_usuario: this.usuario.id_usuario
      });

      this.newMessage = '';
  }


}
