import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  // define a class variable called subscription of the Subscription datatype near the top of the class
  subscription: Subscription;

  // Delete the old EventEmitter variable (selectedDocumentEvent). It is no longer needed because we will be using the new EventEmitter you created in the DocumentService instead
  // @Output() selectedDocumentEvent = new EventEmitter<Document>();
 
  // Replace the code that initializes the documents array with a list of dummy document objects with an empty array instead
  documents: Document[] = [];
    // NO LONGER NEED - GETTING DATA FROM DOCUMENT SERVICE
    // new Document(
    //   '1',
    //   'Secret',
    //   'Alien landing',
    //   'https://apnews.com/article/5117ff1e9d2da3160174e7d9c8cbb6c4',
    //   null
    // ),
    // new Document(
    //   '2',
    //   'Top Secret',
    //   'Alien language',
    //   'https://www.marstranslation.com/blog/alien-language-translator',
    //   null
    // ),
    // new Document(
    //   '3',
    //   'Super Secret',
    //   'Alien plans',
    //   'https://www.cnn.com/2021/11/23/politics/ufo-reports-pentagon/index.html',
    //   null
    // ),
    // new Document(
    //   '4',
    //   'Beyond Secret',
    //   'Alien life on earth',
    //   'https://www.scientificamerican.com/article/maybe-the-aliens-really-are-here/',
    //   null
    // ),
    // new Document(
    //   '5',
    //   'No Secret', 
    //   'Alien food',
    //   'https://www.pinterest.com/sharelynnd/alien-themed-food/',
    //   null
    // )
  

  // inject the new DocumentService into the DocumentListComponent class
  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) { }

  // Modify the ngOnInit() method located in the DocumentListComponent class to call the getDocuments() method defined in the DocumentService. Assign the array returned from the method to the documents class variable
  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();

    // this.documentService.documentChangedEvent
    //   .subscribe(
    //     (documentsArray: Document[]) => {
    //       this.documents = documentsArray;
    //     }
    //   )

    // subscribe to the documentListChangedEvent object you created in the DocumentService class
    // Assign the Subscription object returned from the subscribe() function to the subscription class variable
    this.subscription = this.documentService.documentListChangedEvent
      .subscribe(
        // Pass an arrow function to the subscribe() function. Define an input parameter called documentsList whose datatype is an array of Document objects
        (documentList: Document[]) => {
          // Inside of the function, assign the array passed to the documentsList parameter to the documents class attribute
          this.documents = documentList;
        }
      )
  }

  // Implement the ngOnDestroy() lifecycle function. You will need import the OnDestroy class and add OnDestroy class to the list of functions implemented in the DocumentListComponent class. Unsubscribe from the subscription that was assigned to the subscription class variable in the ngOnInit() function earlier.
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  // delete the onSelectedDocument() method:
  // Modify the onSelectedDocument(document: Document) method to now emit the documentSelectedEvent and pass it the Document object selected and passed into the method.
  // onSelectedDocument(document: Document){
  //   // this.selectedDocumentEvent.emit(document);
  //   this.documentService.documentSelectedEvent.emit(document);
  // }

} 
