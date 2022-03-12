import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
// import the MOCKDOCUMENTS.ts file
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

// add a statement at the top of the file to import the rxjs class
import { Subject } from 'rxjs';
// Import the HttpClient and HttpHeaders packages at the top of the file
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  // Create a new class variable called maxDocumentId of the number data type at the top of the class.
  maxDocumentId: number;

  // Define a new class variable called documentListChangedEvent to the top of the DocumentServiceClass. Create and assign a new Subject object whose datatype is an array of Document objects to the variable
  documentListChangedEvent = new Subject<Document[]>();

  // create a new EventEmitter in the DocumentService class of the Document[] data type and assign it to a property named documentChangedEvent.
  documentChangedEvent = new EventEmitter<Document[]>();

  // add a class variable named documents whose data type is an array of document objects
  private documents: Document[] = [];

  // Create a new EventEmitter in the DocumentService named documentSelectedEvent
  documentSelectedEvent = new EventEmitter<Document>();

  // Use the constructor function in the DocumentService class and assign the value of the MOCKDOCUMENTS variable defined in the MOCKDOCUMENTS.ts file to the documents class variable in the DocumentService class
  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    // this.storeDocuments();
    // Inside the constructor() method of the DocumentService class call the getMaxId() function and assign the value returned to the maxDocumentId class variable
    this.maxDocumentId = this.getMaxId();
   }


 

     //  The DocumentService class needs a method to return the list of documents
  // getDocuments(): Document[]{
  //   // Return a copy of the information from array using 'slice'
  //   return this.documents.slice();
  // }


  // replace the code in the getDocuments() method.
  getDocuments(): Document[]{
    this.http
            .get<Document[]>('https://wdd430-25ca2-default-rtdb.firebaseio.com/documents.json')
            
            .subscribe(
              //  Success method
              // Assign the array of documents received to the documents property
              (documents: Document[]) => {
                this.documents = documents;
                // Call the getMaxId() method to get the maximum value used for the id property in the document list, and assign the value returned to the maxDocumentId property
                this.maxDocumentId = this.getMaxId();
                // Sort the list of documents by name using the sort() JavaScript array method. This method requires that you pass it a compare function. The compare function is called for each element in the array. It receives two inputs, the current element in the array and the next element in the array.   
                this.documents.sort(function (a, b){
                  // If the current element is less than the next element, return a minus one.
                  if(a.name < b.name) {
                    return -1;
                  }
                  // If the first element is greater than the next element, return a one;
                  else if(a.name > b.name){
                    return 1;
                  }
                  // else, return zero
                  else {
                    return 0;
                  }
                });
                // Emit the documentListChangedEvent subject and pass it a cloned copy of the documents array to notify the DocumentListComponent that the document list has changed. Use the slice() JavaScript array method to get a clone of the documents array
                let documentListClone = this.documents.slice();
                this.documentChangedEvent.next(documentListClone);
              },
              // error method
              (error: any) => {
                console.log(error);
              }
              )
              return this.documents.slice();   
  }

  // Create the storeDocuments() method in the DocumentService class. This method will be called when a Document object is added, updated, or deleted in the document list. It will issue an HTTP Put request to update the document list in your Firebase database server.
  storeDocuments(){
    // Convert the documents array into a string format by calling the JSON.stringify() method. This is important because only text data can flow through firewalls when an HTTP request is made
    const documentsArrayString = JSON.stringify(this.documents);
    console.log(documentsArrayString);

    // Create a new HttpHeaders object that sets the Content-Type of the HTTP request to application/json
    const headers = new HttpHeaders()
    .set('content-type', 'application/json');
    console.log(headers);


    // const documents = this.getDocuments();
    this.http
        .put('https://wdd430-25ca2-default-rtdb.firebaseio.com/documents.json', 
        this.documents, {'headers': headers}
        )
        .subscribe(response => {
        console.log(response);
        let documentListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentListClone);
        });
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
    this.documentChangedEvent.emit(this.documents.slice());
    let documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();

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
    // Delete and replace the last statement (the call to the documentListChangedEvent's next() method) with a statement to call the storeDocuments() method instead
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
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
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
  }
}
  