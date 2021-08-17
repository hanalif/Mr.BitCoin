import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactPreviewComponent } from './components/contact-preview/contact-preview.component';
import { EditContactComponent } from './pages/edit-contact/edit-contact.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { TransferFundComponent } from './components/transfer-fund/transfer-fund.component';
import { MoveListComponent } from './components/move-list/move-list.component';
import { ContactsFilterComponent } from './components/contacts-filter/contacts-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserDetailsComponent,
    ContactsComponent,
    ContactListComponent,
    ContactPreviewComponent,
    EditContactComponent,
    ContactDetailsComponent,
    TransferFundComponent,
    MoveListComponent,
    ContactsFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
