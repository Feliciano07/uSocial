import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  channelList = []
  newMessage = ''
  username = '';
  title = 'angular-chat';
  messages: any[] = [];

  currentUser:any = {
    id: 1,
    name: 'Chay'
  }

  constructor() { }

  ngOnInit(): void {
    this.channelList.push({name:'Gerardo',fecha:'12/10/2020 17:08'})
    this.messages.push({
      id: 1,
      name: 'Chay',
      text: 'Hola BB',
      fecha:'12/10/2020 17:08'
    })
    this.messages.push({
      id: 2,
      name: 'David',
      text: 'Hi there',
      fecha:'12/10/2020 17:12'
    })
  }


}
