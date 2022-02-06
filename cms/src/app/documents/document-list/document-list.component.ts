import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

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
  constructor(private documentService: DocumentService) { }

  // Modify the ngOnInit() method located in the DocumentListComponent class to call the getDocuments() method defined in the DocumentService. Assign the array returned from the method to the documents class variable
  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
  }

  // Modify the onSelectedDocument(document: Document) method to now emit the documentSelectedEvent and pass it the Document object selected and passed into the method.
  onSelectedDocument(document: Document){
    // this.selectedDocumentEvent.emit(document);
    this.documentService.documentSelectedEvent.emit(document);
  }

}
