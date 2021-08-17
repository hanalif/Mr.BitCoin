import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { CONTACTS } from '../data/contacts';
import { Contact } from '../models/contact.model';
import { FilterBy } from '../models/filter-by.model';
import { UserService } from './user.service';
import { UtilService } from './util.service';



@Injectable({
  providedIn: 'root'
})
export class ContactService {

  //mock the server
  private _contactsDb: Contact[] = CONTACTS;
  public CONTACTS_KEY: string ='CONTACTS'

  private _contacts$ = new BehaviorSubject<Contact[]>([])
  public contacts$ = this._contacts$.asObservable()

  private _filterBy$ = new BehaviorSubject<Contact[]>([])
  public filterBy$ = this._filterBy$.asObservable()

  constructor(private utilService: UtilService, private userService: UserService) {
  }


  public loadContacts(filterBy: FilterBy = null): void {
    let contacts = this._getLoggedinUserContacts()
    if (filterBy && filterBy.term) {
      contacts = this._filter(contacts, filterBy.term)
    }
    this._contacts$.next(this._sort(contacts))
  }

  private _getLoggedinUserContacts() {
    let contacts = this._contactsDb;
    const loggedInUser = this.userService.getLoggedInUser();
    contacts = contacts.filter(contact => contact.createdByUserId === loggedInUser._id)
    if (!contacts) {
      contacts = []
    }
    this.utilService.saveToStorage(this.CONTACTS_KEY, contacts)
    return contacts;
  }

  public getContactById(id: string): Observable<Contact> {
    //mock the server work
    const contact = this._contactsDb.find(contact => contact._id === id)

    //return an observable
    return contact ? of(contact) : Observable.throw(`Contact id ${id} not found!`)
  }

  public deleteContact(id: string) {
    //mock the server work
    this._contactsDb = this._contactsDb.filter(contact => contact._id !== id)
    const userContacts = this._contacts$.getValue().filter(contact => contact._id !== id);

    // change the observable data in the service - let all the subscribers know
    this._contacts$.next(userContacts)
  }

  public saveContact(contact: Contact) {
    return contact._id ? this._updateContact(contact) : this._addContact(contact)
  }

  private _updateContact(contact: Contact) {
    //mock the server work
    this._contactsDb = this._contactsDb.map(c => contact._id === c._id ? contact : c)
    // change the observable data in the service - let all the subscribers know
    this._contacts$.next(this._sort(this._contactsDb))
  }

  private _addContact(contact: Contact) {
    //mock the server work

    const newContact: Contact = {
      ...contact,
      _id: this.utilService.makeId(),
      imgUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    };

    this._contactsDb.push(newContact)
    this._contacts$.next(this._sort(this._contactsDb))
  }

  private _sort(contacts: Contact[]): Contact[] {
    return contacts.sort((a, b) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        return -1;
      }
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        return 1;
      }

      return 0;
    })
  }

  private _filter(contacts: Contact[], term: string) {
    term = term.toLocaleLowerCase()
    return contacts.filter(contact => {
      return contact.name.toLocaleLowerCase().includes(term) ||
        contact.phone.toLocaleLowerCase().includes(term) 
        // ||
        // contact.email.toLocaleLowerCase().includes(term)
    })
  }

}



