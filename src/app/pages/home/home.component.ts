import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserCred } from 'src/app/models/user-cred.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  loggedInUser: User;
  subscription: Subscription;

  constructor(private userService: UserService) {
  }


  ngOnInit(): void {
    this.subscription = this.userService.loggedInUser$.subscribe((user) => { 
      this.loggedInUser = user;
    })
  }

  onLogin(userCred: UserCred) {
    this.userService.login(userCred.username, userCred.password).subscribe(
      {
        error: () => {
          console.log("Error on login");
        }
      }
    );
  }

  onSignup(userCred: UserCred) {
    this.userService.signup(userCred.username, userCred.password).subscribe(
      {
        error: () => {
          console.log("Error on signup");
        }
      }
    )

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
