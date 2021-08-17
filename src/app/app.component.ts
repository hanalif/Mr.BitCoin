import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mister-bit-coin';
  isLoggedinUser: boolean;
  subscription: Subscription;
  constructor( private userService: UserService, private router:Router) { }
  ngOnInit(): void {
    this.subscription = this.userService.loggedInUser$.subscribe((user=>{
      this.isLoggedinUser = user != null;
    }));
    console.log(this.isLoggedinUser)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onLogout(): void{
    this.userService.logout();
    this.router.navigateByUrl('');
  }
}
