import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      '1',
      'Secret',
      'Alien landing',
      'url',
      null
    ),
    new Document(
      '2',
      'Top Secret',
      'Alien language',
      'url2',
      null
    ),
    new Document(
      '3',
      'Super Secret',
      'Alien plans',
      'url3',
      null
    ),
    new Document(
      '4',
      'Beyond Secret',
      'Alien life on earth',
      'url4',
      null
    ),
    new Document(
      '5',
      'No Secret', 
      'Alien food',
      'url5',
      null
    )
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }

}
