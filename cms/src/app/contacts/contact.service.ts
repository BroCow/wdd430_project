import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
//  Add new import for SUBJECT
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // Create a new class variable called maxDocumentId of the number data type at the top of the class.
  maxContactId: number;

  // Define a new class variable called documentListChangedEvent to the top of the DocumentServiceClass. Create and assign a new Subject object whose datatype is an array of Document objects to the variable
  contactListChangedEvent = new Subject<Contact[]>();

  contactChangedEvent = new EventEmitter<Contact[]>();
  // Create a class variable named contacts whose data type is an array of contact objects. Initialize the variable with an empty array ([])
  contacts: Contact[] = [];

  // Add an EventEmitter to the ContactService. Define a new variable named contactSelectedEvent and assign a new EventEmitter object of the contact data type to the variable
  contactSelectedEvent = new EventEmitter<Contact>();


  constructor() {
    // Inside the constructor method, assign the value of the MOCKCONTACTS variable defined in the MOCKCONTACTS.ts file to the contacts class variable in the ContactService class.
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
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
    }
    return null;
  }

  getMaxId(): number{
    let maxId = 0;
    this.contacts.forEach(element => {
      let currentId = parseInt(element.id);
      if(currentId > maxId){
        maxId = currentId
      }
    });
    return maxId;
  }

  deleteContact(contact: Contact){
    if(contact == undefined || contact == null){
      return;
    }
    let pos = this.contacts.indexOf(contact);
    if(pos<0){
      return;
    }
    this.contacts.splice(pos, 1);
    let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
    this.contactChangedEvent.emit(this.contacts.slice());
  }

  addContact(newContact: Contact){
    if(newContact == undefined || newContact == null){
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact){
    if(originalContact == undefined || originalContact == null || newContact == undefined || newContact == null){
      return;
    }
    let pos = this.contacts.indexOf(originalContact);
    if(pos < 0){
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }
}
 