import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  // Define a property named term of the string data type at the top of the ContactListComponent class.
  term: string;

  // define a class variable called subscription of the Subscription datatype near the top of the class
  contactSub: Subscription;

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

    // this.contactService.contactChangedEvent
    //   .subscribe(
    //     (contactsArray: Contact[]) => {
    //       this.contacts = contactsArray;
    //     }
    //   ) 

      // subscribe to the documentListChangedEvent object you created in the DocumentService class
    // Assign the Subscription object returned from the subscribe() function to the subscription class variable
    this.contactSub = this.contactService.contactListChangedEvent
      // Pass an arrow function to the subscribe() function. Define an input parameter called documentsList whose datatype is an array of Document objects
      .subscribe(
        (contactList: Contact[]) => {
          // Inside of the function, assign the array passed to the documentsList parameter to the documents class attribute
          this.contacts = contactList;
        }
      )
  }

  // Implement the ngOnDestroy() lifecycle function. You will need import the OnDestroy class and add OnDestroy class to the list of functions implemented in the DocumentListComponent class. Unsubscribe from the subscription that was assigned to the subscription class variable in the ngOnInit() function earlier.
  ngOnDestroy(): void {
    this.contactSub.unsubscribe();
}

  // onSelected(contact: Contact){
  //   console.log('onSelected called');
  //   console.log(contact);
  //   // NO LONGER NEEDED - USING CONTACT SERVICE
  //   // this.selectedContactEvent.emit(contact);

  //   // Modify the onSelected(contact:Contact) method in the ContactListComponent class to emit the contactSelectedEvent with the Contact object passed into the method
  //   this.contactService.contactSelectedEvent.emit(contact);
  // }

  search(value: string){
    this.term = value;
    
  }



}
 