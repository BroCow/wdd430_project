import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
// import the MOCKDOCUMENTS.ts file
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

// add a statement at the top of the file to import the rxjs class
import { Subject } from 'rxjs';
 
@Injectable({ 
  providedIn: 'root'
})
export class DocumentService {
  // Create a new class variable called maxDocumentId of the number data type at the top of the class.
  maxDocumentId: number;

  // Define a new class variable called documentListChangedEvent to the top of the DocumentServiceClass. Create and assign a new Subject object whose datatype is an array of Document objects to the variable
  documentListChangedEvent = new Subject<Document[]>();

  // create a new EventEmitter in the DocumentService class of the Document[] data type and assign it to a property named documentChangedEvent.
  documentChangedEvent = new EventEmitter<Document[]>();

  // add a class variable named documents whose data type is an array of document objects
  documents: Document[] = [];

  // Create a new EventEmitter in the DocumentService named documentSelectedEvent
  documentSelectedEvent = new EventEmitter<Document>();

  // Use the constructor function in the DocumentService class and assign the value of the MOCKDOCUMENTS variable defined in the MOCKDOCUMENTS.ts file to the documents class variable in the DocumentService class
  constructor() {
    this.documents = MOCKDOCUMENTS;
    // Inside the constructor() method of the DocumentService class call the getMaxId() function and assign the value returned to the maxDocumentId class variable
    this.maxDocumentId = this.getMaxId();
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
    if(document == undefined || document == null){
      return;
    }
    let pos = this.documents.indexOf(document);
    if(pos<0){
      return;
    }
    this.documents.splice(pos, 1);
    // this.documentChangedEvent.emit(this.documents.slice());
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
    this.documentChangedEvent.next(this.documents.slice());
  }

  getMaxId(): number{
    let maxId = 0;
    this.documents.forEach(element => {
      let currentId = parseInt(element.id);
      if(currentId > maxId){
        maxId = currentId
      }
    });
    return maxId;
  }

  addDocument(newDocument: Document){
    if(newDocument == undefined || newDocument == null){
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document){
    if(originalDocument == undefined || originalDocument == null || newDocument == undefined || newDocument == null){
      return;
    }
    let pos = this.documents.indexOf(originalDocument);
    if(pos < 0){
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }
}
  