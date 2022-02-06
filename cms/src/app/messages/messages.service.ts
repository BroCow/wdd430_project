import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  // Create a new EventEmitter of the Message[] data type and assign it to a new class variable named messageChangedEvent at the top of the MessageService class
  messageChangedEvent = new EventEmitter<Message[]>();

  // add a class variable named messages whose data type is an array of Message objects
  messages: Message[] = [];

  // Use the constructor method in the MessageService class and assign the value of the MOCKMESSAGES variable defined in the MOCKMESSAGES.ts file to the messages class variable in the MessageService class
  constructor() {
    this.messages = MOCKMESSAGES;
  }

  //  The MessageService class needs a method to return the list of messages
  getMessages(): Message[]{
    // Return a copy of the information from array using 'slice'
    return this.messages.slice();
  }

  // The MessageService also needs a method to find a specific Message object in the messages array
  getMessage(id: string): Message{
    // This method will search through all of the Message objects in the messages array and return the Message object whose id property is equal to the value of the id input parameter. It returns the Message object found if successful; otherwise, it returns a null value to indicate that the contact was not found. Implement this method.
    for(let message of this.messages){
      if(message.id === id){
        return message;
      }
    }
    return null;
  }

  // add a new function to the MessageService class with the following signature:
  // addMessage(message: Message)
  addMessage(message: Message){
    // Inside the method, push the Message passed as an input onto the messages array defined in the MessageService class
    this.messages.push(message);

    // At the end of the addMessage() method, use the messageChangedEvent emitter to emit a copy—for example, the slice() method
    this.messageChangedEvent.emit(this.messages.slice());
    
  }
}
