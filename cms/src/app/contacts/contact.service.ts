import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // Create a class variable named contacts whose data type is an array of contact objects. Initialize the variable with an empty array ([])
  contacts: Contact[] = [];

  // Add an EventEmitter to the ContactService. Define a new variable named contactSelectedEvent and assign a new EventEmitter object of the contact data type to the variable
  contactSelectedEvent = new EventEmitter<Contact>();


  constructor() {
    // Inside the constructor method, assign the value of the MOCKCONTACTS variable defined in the MOCKCONTACTS.ts file to the contacts class variable in the ContactService class.
    this.contacts = MOCKCONTACTS;
   }

  //  The ContactService class needs a method to return the list of contacts
  getContacts(): Contact[]{
    // Return a copy of the information from array using 'slice'
    return this.contacts.slice();
  }

  // The ContactService also needs a method to find a specific Contact object in the contacts array
  getContact(id: string): Contact{
    // This method will search through all of the Contact objects in the contacts array and return the Contact object whose id property is equal to the value of the id input parameter. It returns the Contact object found if successful; otherwise, it returns a null value to indicate that the contact was not found. Implement this method.
    // FOR each contact in the contacts list
    for(let contact of this.contacts){
      if (contact.id === id){
        return contact;
      } 
      break;
    }
    return null;
  }
}
 