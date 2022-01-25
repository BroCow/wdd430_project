import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [
    new Message(
      '2',
      'Angular',
      'Angular is challenging',
      'Max Pain'
    ),
    new Message(
      '3',
      'BYU',
      'BYU is awesome',
      'Max Joy'
    ),
    new Message(
      '3',
      'Coding',
      'Coding is fun',
      'Max Code'
    )
  ]

  constructor() { }
 
  ngOnInit(): void {
  }

  onAddMessage(message: Message){
    console.log('onAddMessage called');
    console.log(this.messages);
    this.messages.push(message);
    console.log(this.messages);
  }

}
