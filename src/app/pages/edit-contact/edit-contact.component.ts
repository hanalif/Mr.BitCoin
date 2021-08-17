import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  editContactForm: FormGroup;
  contact: Contact;
  @Output() saveContat = new EventEmitter<Contact>();
  
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private contactService: ContactService) { }

  ngOnInit(): void {
    this.contact = this.route.snapshot.data.contact;
    this.createForm();


  }
  createForm() {
    this.editContactForm = new FormGroup({
      name: new FormControl(this.contact?.name, Validators.required),
      email: new FormControl(this.contact?.email, Validators.required),
      phone: new FormControl(this.contact?.phone, Validators.required),

    });
  }
  getContactToSave(){
    let contactToSave: Contact  = this.editContactForm.getRawValue();
    this.editContactForm.reset();
    return contactToSave;
  }

  onSaveContat(){
    let contactToSave = this.getContactToSave();
    if(!this.contact?._id){
      contactToSave.createdByUserId = this.userService.getLoggedInUser()._id;
    }else{
      contactToSave._id = this.contact._id;
      contactToSave.createdByUserId = this.contact.createdByUserId;
    }
    
    this.contactService.saveContact(contactToSave);
    this.router.navigateByUrl('contacts');


  }
}
