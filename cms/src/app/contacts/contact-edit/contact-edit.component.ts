import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  // groupContacts: string;

  contact: Contact;
  originalContact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) 
              { }

  ngOnInit(): void {
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
        this.originalContact = this.contactService.getContact(this.id);
        console.log("originalContact id = " + this.originalContact.id);

        if(!this.originalContact){
          console.log("originalDocument is undefined or null");
          return;
        }

        this.editMode = true;
        console.log(this.editMode);

        this.contact = {...this.originalContact};

        if(this.groupContacts){
          this.groupContacts = {...this.groupContacts};
        }
      }
    )
  }

  onCancel(){
    console.log("cancel");
    this.router.navigate(['/contacts']);
  }

  onSubmit(form: NgForm){
    console.log("submitted");
    const value = form.value;
    
    const newContact = new Contact(value.id, value.name, value.email, value.phone, value.imageUrl, value.group);

    if(this.editMode){
      console.log("editMode = true");
      this.contactService.updateContact(this.originalContact, newContact);
      console.log("updateContact called");
    } else {
      this.contactService.addContact(newContact)
      console.log("addContact called");
    }

    this.router.navigate(['/contacts']);
  }

}
