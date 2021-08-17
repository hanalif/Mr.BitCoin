import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListComponent implements OnInit {
  @Input() contacts :  Contact[]
  @Output() onDeleteContact = new EventEmitter;
  constructor() { }

  ngOnInit(): void {
  }

  deleteContact(contactId: string){
    this.onDeleteContact.emit(contactId);
  }
}
