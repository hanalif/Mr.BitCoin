import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts$: Observable<Contact[]>;
  subscription: Subscription;
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.loadContacts()
    this.contacts$ = this.contactService.contacts$
     
   
  }


  deleteContact(contactId: string){
    this.contactService.deleteContact(contactId);
  }

}
