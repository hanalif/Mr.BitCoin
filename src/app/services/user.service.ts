import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { USERS } from '../data/users';
import { User } from '../models/user.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { UtilService } from './util.service';
import { Transfer } from '../models/transfer.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public USER_KEY: string ="USERS";
  private LOGGEDINUSER_KEY: string = "LOGGEDINUSER" 
  private _usersDb: User[] = USERS.map(u=>{
    let user: User = {
      ...u,
      moves: [],
    }
    return user
  });;
 


  private _loggedInUser$ = new BehaviorSubject<User>(null)
  public loggedInUser$ = this._loggedInUser$.asObservable()
  
  constructor(private httpClient: HttpClient, private utilService: UtilService) { }
  
  private _saveUsersToLocalStorage(){
    this.utilService.saveToStorage(this.USER_KEY, this._usersDb || [])
  }

  public login(username: string, password: string): Observable<null>{
    // return this.httpClient.post<any>('/api/login', { username, password }).pipe(
    //   tap((user) => {
    //     this._loggedInUser$.next(user);
    //   })
    // );

    return new Observable(observer => {
      let users = this._usersDb;
      this._saveUsersToLocalStorage()
      let loggedInUser = users.find(user => user.password === password && user.username === username);
      if(!loggedInUser){
        observer.error()
      }
      else {
        this.utilService.saveToStorage(this.LOGGEDINUSER_KEY,loggedInUser)
        this._loggedInUser$.next(loggedInUser);
        observer.next();
      }
      observer.complete();
    })
  }

  public signup (username: string, password: string): Observable<null>{
    const signup$ = new Observable(observer => {
      const newUser: User = {
        _id: this.utilService.makeId(),
        username,
        password,
        coins: "100",
        moves: []
      };
      this._usersDb.push(newUser);
      this.utilService.saveToStorage(this.USER_KEY, this._usersDb)
      observer.next();
      observer.complete();
    });

    return signup$.pipe(
      switchMap(() => this.login(username, password))
    );
  }

  getLoggedInUser() {
    return this._loggedInUser$.getValue()
  }

  logout() {
    this._loggedInUser$.next(null);
    localStorage.clear();
  }

  public saveTransferToUser(transfer: Transfer){
    let loggedinUserId = this.getLoggedInUser()._id;
    let users: User[] = this.utilService.loadFromStorage(this.USER_KEY);
    let loggedinUser = users.find(user => user._id === loggedinUserId);
    let useCoinsUpdatedSum = +loggedinUser.coins - transfer.amount;
    loggedinUser.coins = useCoinsUpdatedSum.toString()
    this._usersDb = this._usersDb.map(u => loggedinUser._id === u._id ? loggedinUser : u);
    this.utilService.saveToStorage(this.USER_KEY, this._usersDb )
    this._loggedInUser$.next(loggedinUser);

  }

}
