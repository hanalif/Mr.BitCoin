import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { Transfer } from 'src/app/models/transfer.model';
import { TransferService } from 'src/app/services/transfer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact;
  userMoves: Transfer[];
  subscription: Subscription;
 

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private transferService: TransferService) { }

  ngOnInit(): void {
    this.contact = this.route.snapshot.data.contact;
    this.subscription = this.transferService.transfers$.subscribe((transfers)=>{
      let contactTransfers = transfers.filter(t=> t.toContactId === this.contact._id)
      this.userMoves =contactTransfers ;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  

  onTransfer(amount: number){
    let transferToSave :Transfer = {
      _id: null,
      fromUserId: this.userService.getLoggedInUser()._id,
      toContactId: this.contact._id,
      toContactName: this.contact.name,
      amount,
      date: null
    }
    this.transferService.saveTransfer(transferToSave)

  }

}
