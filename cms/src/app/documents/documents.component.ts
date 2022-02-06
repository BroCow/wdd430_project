import { Component, OnInit } from '@angular/core';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  selectedDocument: Document;

  // inject the DocumentService into the DocumentsComponent.
  constructor(private documentService: DocumentService) { }

  // Implement the ngOnInit() method and subscribe to the documentSelectedEvent of the DocumentService
  ngOnInit(): void {
    this.documentService.documentSelectedEvent
    .subscribe(
      // Implement an arrow function to receive the document object passed with the emitted event and assign it to the selectedDocument class variable in the DocumentsComponent
      (document: Document) => {
        this.selectedDocument = document;
      }
    )
  }
 
} 
