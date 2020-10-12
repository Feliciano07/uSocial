import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  focused = false;
  constructor() { }

  ngOnInit(): void {
  }

  leave() { this.focused = false; }
  focus() { this.focused = true; }

  fileChangeEvent(files, event) {
    if (files.length === 0) {
      return;
    }
    console.log('files   ',files)
    console.log('event   ',event)
  }
}
