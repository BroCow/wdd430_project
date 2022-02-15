import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
// NO LONGER NEEDED - USING 'contactSelectedEvent' EMITTER IN CONTACT SERVICE
  // @Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [];
  // CODE BELOW NO LONGER NEEDED SINCE WE ARE GETTING DATA FROM CONTACT SERVICE
    // new Contact(
    //   '1', 
    //   'R. Kent Jackson', 
    //   'jacksonk@byui.edu', 
    //   '208-496-3771', 
    //   '../../assets/images/jacksonk.jpg',
    //   null),

    // new Contact(
    //   '2',
    //   'Rex Barzee',
    //   'barzeer@byui.edu',
    //   '208-496-3768',
    //   '../../assets/images/barzeer.jpg',
    //   null
    // )
   
    
  //  Modify the constructor() method to inject the ContactService into the ContactListComponent class
  constructor(private contactService: ContactService) { }

  // Modify the ngOnInit() method to call the getContacts() method in the ContactService and assign the array of contacts returned from the method call to the contacts class variable in the ContactListComponent
  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();

    this.contactService.contactChangedEvent
      .subscribe(
        (contactsArray: Contact[]) => {
          this.contacts = contactsArray;
        }
      )
  }

  // onSelected(contact: Contact){
  //   console.log('onSelected called');
  //   console.log(contact);
  //   // NO LONGER NEEDED - USING CONTACT SERVICE
  //   // this.selectedContactEvent.emit(contact);

  //   // Modify the onSelected(contact:Contact) method in the ContactListComponent class to emit the contactSelectedEvent with the Contact object passed into the method
  //   this.contactService.contactSelectedEvent.emit(contact);
  // }

}
 