import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  // Add a new class variable named messageSender of the string data type to the top of the class
  messageSender: string;

  @Input() message: Message;

  // inject ContactService into the constructor() method of the MessageItemComponent class
  constructor(private contactService: ContactService) { }
 
  ngOnInit(): void {
    // Implement the ngOnInit() lifecycle method. Inside of the method, call the getContact() method and pass it the value of the sender property of the current message as shown below. Then, get the name of the contact found and assign it to the class variable messageSender
    // const contact: Contact = this.contactService.getContact(this.message.sender);

    const contact: Contact = this.contactService.getContact(this.message.id);
    this.messageSender = contact.name;
  }

}
