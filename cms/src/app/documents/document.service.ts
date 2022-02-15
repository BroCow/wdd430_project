import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
// import the MOCKDOCUMENTS.ts file
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({ 
  providedIn: 'root'
})
export class DocumentService {
  // create a new EventEmitter in the DocumentService class of the Document[] data type and assign it to a property named documentChangedEvent.
  documentChangedEvent = new EventEmitter<Document[]>();
  // add a class variable named documents whose data type is an array of document objects
  documents: Document[] = [];

  // Create a new EventEmitter in the DocumentService named documentSelectedEvent
  documentSelectedEvent = new EventEmitter<Document>();

  // Use the constructor function in the DocumentService class and assign the value of the MOCKDOCUMENTS variable defined in the MOCKDOCUMENTS.ts file to the documents class variable in the DocumentService class
  constructor() {
    this.documents = MOCKDOCUMENTS;
   }

     //  The DocumentService class needs a method to return the list of documents
  getDocuments(): Document[]{
    // Return a copy of the information from array using 'slice'
    return this.documents.slice();
  }

  // The DocumentService also needs a method to find a specific Document object in the documents array
  getDocument(id: string): Document{
    // This method will search through all of the Contact objects in the documents array and return the Contact object whose id property is equal to the value of the id input parameter. It returns the Contact object found if successful; otherwise, it returns a null value to indicate that the contact was not found. Implement this method.
    // FOR each contact in the documents list
    for(let document of this.documents){
      if(document.id === id){
        return document;
      }
    }
    return null;
    // IF contact.id equals the id THEN
    // RETURN contact
    // ENDIF
    // ENDFOR
    // RETURN null
  }

  deleteDocument(document: Document){
    if(!document){
      return;
    }
    const pos = this.documents.indexOf(document);
    if(pos<0){
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }
}
 