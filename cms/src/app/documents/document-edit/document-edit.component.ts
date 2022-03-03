import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  // add the following properties at the top of the class:
  
  originalDocument: Document; //references the original, unedited version of the document
  document: Document; //references the edited version of the document displayed in the form
  editMode: boolean = false;  //indicates whether an existing document is to be edited, or a new document is being created

  id: string;

  // Inject the DocumentService, Router, and ActivatedRoute classes in the class constructor() method
  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.route.params
      .subscribe(
        (params: Params) => {
          console.log("params id = " + this.id);

          this.id = params['id'];

          if(!this.id){
            console.log("this.Id parameter is undefined or null")
            this.editMode = false;
            return;
          }

          console.log("Found an id");
          this.originalDocument = this.documentService.getDocument(this.id);
          console.log("originalDocument id = " + this.originalDocument.id);
          

          if(!this.originalDocument){
            console.log("originalDocument is undefined or null");
            return;
          }

          this.editMode = true;
          console.log(this.editMode);

          // this.document = JSON.parse(JSON.stringify(this.originalDocument));
          this.document = {...this.originalDocument};
          console.log("copy of document = " + this.document);
        }
      )
  }
 
  onCancel(){
    console.log("cancel");
    this.router.navigate(['/documents']);
    
  }

  onSubmit(form: NgForm){
    // called when the end user selects the Save button and submits the form. It is responsible for either adding a new document to the document list or updating an existing document in the document list.
    console.log(form.value.name);

    const value = form.value // get values from forms fields
    console.log(value.id);
    console.log(value.name);
    console.log(value.description);
    console.log(value.url);

    const newDocument = new Document(value.id, value.name, value.description, value.url, null);
    console.log("new document = " + newDocument);

    if(this.editMode){
      console.log("editMode = true");
      this.documentService.updateDocument(this.originalDocument, newDocument);
      console.log("updateDocument called");
    } else {
      this.documentService.addDocument(newDocument)
      console.log("addDocument called");
    }

    this.router.navigate(['/documents']);
  }
}
