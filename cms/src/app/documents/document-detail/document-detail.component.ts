import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  // Define a new property at the top of the DocumentDetailComponent class named nativeWindow whose datatype is any.
  nativeWindow: any;

  // The document is no longer being passed directly to the component as an input, so you should delete the @Input() annotation in front of the document property
  // @Input() 
  document: Document;

  id: string;
  

  // modify the constructor() method to inject a DocumentService, Router, and ActivatedRoute into the DocumentDetailComponent.
  // Modify the constructor() method to inject an instance of the WindRefService into the DocumentDetailComponent class
  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute,
              private windRefService: WindRefService) {
                this.nativeWindow = windRefService.getNativeWindow();
               } 

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          console.log(this.id);
          this.document = this.documentService.getDocument(this.id);
        }
      )
  }

  onView(){
    if (this.document.url){
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete(){
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }

} 
 