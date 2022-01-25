import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  currentSender: string = 'Chris';

  @ViewChild('subjectInput') subject: ElementRef;
  @ViewChild('msgTextInput') msgText: ElementRef;

  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor() { }
 
  ngOnInit(): void {
  }

  onSendMessage(){
    console.log('onSendMessage called');
    // Get value stored in the subject input element
    let subjectInput = this.subject.nativeElement.value;


    // Get value stored in the msgText input element
    let msgTextInput = this.msgText.nativeElement.value;

    // Create a new Message object
    // Assign a hardcoded number to the id property of the new Message object
    // Assign the value of the currentSender class variable to the sender property of the new Message object
    // Assign the values retrieved from the subject and msgText input elements to the corresponding properties of the new Message object
    let newMessage = new Message('1', subjectInput, msgTextInput, this.currentSender);
    console.log(newMessage);
    
    // Call the addMessageEvent emitter’s emit() method and pass it the new Message object just created
    this.addMessageEvent.emit(newMessage);
  }

  onClear(){
  this.subject.nativeElement.value = '';
  this.msgText.nativeElement.value = '';
  }

}