import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  // Replace the code that initializes the messages array with a list of dummy messages with an empty array instead
  messages: Message[] = [];
    // NO LONGER NEED THIS CODE - GETTING DATA FROM SERVICE
    // new Message(
    //   '2',
    //   'Angular',
    //   'Angular is challenging',
    //   'Max Pain'
    // ),
    // new Message(
    //   '3',
    //   'BYU',
    //   'BYU is awesome',
    //   'Max Joy'
    // ),
    // new Message(
    //   '3',
    //   'Coding',
    //   'Coding is fun',
    //   'Max Code'
    // )
 

  // inject the new MessageService into the MessageListComponent class
  constructor(private messageService: MessagesService) { }
 
  // Modify the ngOnInit() method located in the MessageListComponent class to call the getMessages() method of the MessageService class.  Assign the array returned from the method to the messages class variable
  ngOnInit(): void {
    this.messages = this.messageService.getMessages();

    // subscribe to the messageChangedEvent emitter defined in the MessageService
    this.messageService.messageChangedEvent
    .subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    )
  }

  onAddMessage(message: Message){
    console.log('onAddMessage called');
    console.log(this.messages);
    this.messages.push(message);
    console.log(this.messages);
  }

}
