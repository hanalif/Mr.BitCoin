import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserCred } from 'src/app/models/user-cred.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @Output() login = new EventEmitter<UserCred>();
  @Output() signup = new EventEmitter<UserCred>();


  constructor() { }

  ngOnInit(): void {
    this.createForm()
  }
  createForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  getUserCred(){
    const userCred: UserCred  = this.loginForm.getRawValue();
    this.loginForm.reset();
    return userCred;
  }

  onLogin(){
    const userCred =  this.getUserCred()
    this.login.emit(userCred);
  }
  onSignup(){
    const userCred =  this.getUserCred()
    console.log('signup', userCred)
    this.signup.emit(userCred);
  }
}
