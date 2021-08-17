import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterBy } from 'src/app/models/filter-by.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contacts-filter',
  templateUrl: './contacts-filter.component.html',
  styleUrls: ['./contacts-filter.component.scss']
})
export class ContactsFilterComponent implements OnInit {
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
  }


  onSearch(ev : any){
    console.log(ev)
    const filterBy: FilterBy  = {term: ev.target.value};
    this.contactService.loadContacts(filterBy)
  }

}
