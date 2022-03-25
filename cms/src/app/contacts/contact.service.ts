import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
//  Add new import for SUBJECT
import { Subject } from 'rxjs';
// Import the HttpClient and HttpHeaders packages at the top of the file
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  private contacts: Contact[] = [];

  // Add an EventEmitter to the ContactService. Define a new variable named contactSelectedEvent and assign a new EventEmitter object of the contact data type to the variable
  contactSelectedEvent = new EventEmitter<Contact>();


  constructor(private http: HttpClient) {
    // Inside the constructor method, assign the value of the MOCKCONTACTS variable defined in the MOCKCONTACTS.ts file to the contacts class variable in the ContactService class.
    // this.contacts = MOCKCONTACTS;
    // this.storeContact();
    // this.maxContactId = this.getMaxId();
    this.getContacts();
   }
 
  //  The ContactService class needs a method to return the list of contacts
  getContacts(): Contact[]{
    // Return a copy of the information from array using 'slice'
    // return this.contacts.slice();
    this.http
      .get<Contact[]>('http://localhost:3000/contacts')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort(function (a,b){
            if(a.name < b.name){
              return -1;
            }
            else if(a.name > b.name){
              return 1;
            }
            else{
              return 0;
            }
          });
          let contactListClone = this.contacts.slice();
          this.contactChangedEvent.next(contactListClone);
        },
        (error: any) => {
          console.log(error);
        }
      )
      return this.contacts.slice();
  }


  storeContact(){
    const contactsArrayString = JSON.stringify(this.contacts);
    console.log(contactsArrayString);

    const headers = new HttpHeaders()
    .set('content-type', 'application/json');
    console.log(headers);

    // const contacts = this.getContacts();
    this.http
      .put('https://wdd430-25ca2-default-rtdb.firebaseio.com/contacts.json',
      this.contacts, {'headers': headers}
      )
      .subscribe(response => {
        console.log(response);

        let contactListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactListClone);
      });
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
    console.log('contacts ', this.contacts);
    this.contacts.forEach(element => {
      let currentId = parseInt(element.id);
      if(currentId > maxId){
        maxId = currentId
      }
    });
    return maxId;
  }

  deleteContact(contact: Contact){
    // if(contact == undefined || contact == null){
    if(!contact){
      return;
    }
    let pos = this.contacts.indexOf(contact);
    if(pos<0){
      return;
    }
    this.contacts.splice(pos, 1);
    let contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);
    this.storeContact();

    this.contactChangedEvent.emit(this.contacts.slice());
  }

  // addContact(newContact: Contact){
  //   if(newContact == undefined || newContact == null){
  //     return;
  //   }
  //   this.maxContactId++;
  //   newContact.id = this.maxContactId.toString();
  //   this.contacts.push(newContact);
  //   let contactsListClone = this.contacts.slice();
  //   // this.contactListChangedEvent.next(contactsListClone);
  //   this.storeContact();
  // }


  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    // make sure id of the new Document is empty
    contact.id = '';

    // header tells your NodeJS server that you are passing a JSON object
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
      contact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new contact to documents
          this.contacts.push(responseData.contact);
          this.storeContact();
        }
      );
  }

//   updateContact(originalContact: Contact, newContact: Contact){
//     if(originalContact == undefined || originalContact == null || newContact == undefined || newContact == null){
//       return;
//     }
//     let pos = this.contacts.indexOf(originalContact);
//     if(pos < 0){
//       return;
//     }
//     newContact.id = originalContact.id;
//     this.contacts[pos] = newContact;
//     let contactsListClone = this.contacts.slice();
//     // this.contactListChangedEvent.next(contactsListClone);
//     this.storeContact();
//   }



updateContact(originalContact: Contact, newContact: Contact) {
  if (!originalContact || !newContact) {
    return;
  }

  const pos = this.contacts.findIndex(d => d.id === originalContact.id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Contact to the id of the old Contact
  newContact.id = originalContact.id;
  // newDocument._id = originalDocument._id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.http.put('http://localhost:3000/contacts/' + originalContact.id,
    newContact, { headers: headers })
    .subscribe(
      (response: Response) => {
        this.contacts[pos] = newContact;
        this.storeContact();
      }
    );
}
 
}