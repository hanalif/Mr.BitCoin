import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';


@Component({
  selector: 'app-contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPreviewComponent implements OnInit {
  @Input() contact : Contact;
  @Output() deleteContact =  new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  onDeleteContact(){
    this.deleteContact.emit();
  }
}
