import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class ContactResolverService implements Resolve<Contact> {

  constructor(private contactService: ContactService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact> {
    let { id } = route.params;
    return this.contactService.getContactById(id);
  }

}
