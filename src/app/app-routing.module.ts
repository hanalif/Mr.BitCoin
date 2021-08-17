import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { EditContactComponent } from './pages/edit-contact/edit-contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactResolverService } from './services/contact-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'contacts',
    canActivate: [AuthGuard],
    component: ContactsComponent,
  },
  {
    path: 'contact/:id',
    component: ContactDetailsComponent,
    resolve: {contact: ContactResolverService}

  },
  {
    path: 'edit/:id',
    component: EditContactComponent,
    resolve: {contact: ContactResolverService}
  },
  {
    path: 'edit',
    component: EditContactComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
