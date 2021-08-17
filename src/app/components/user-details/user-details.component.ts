import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Transfer } from 'src/app/models/transfer.model';
import { User } from 'src/app/models/user.model';
import { TransferService } from 'src/app/services/transfer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  loggedInUser: User;
  subscription1: Subscription;
  subscription2: Subscription;
  userMoves: Transfer[];
  
  

  constructor(private userService: UserService, private router:Router, private transferService: TransferService) { }

  ngOnInit(): void {
    this.subscription1 = this.userService.loggedInUser$.subscribe((user) => {
      this.loggedInUser = user;
    })
    this.subscription2 = this.transferService.transfers$.subscribe((transfers)=>{
      this.userMoves =transfers ;
    })

  }
  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

 
  
}


