import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TRANSFERS } from '../data/transfers';
import { Transfer } from '../models/transfer.model';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  public TRANSFER_KEY: string ="TRANSFERS";
  public LOGGEDINUSER_TRANSFERS_KEY : string = 'LOGGEDINUSERTRANSFERS'
  
  private _transfersDb: Transfer[] = TRANSFERS.map(t=>{
    let transfer: Transfer = {
      ...t,
      amount: +t.amount,
      date: new Date(t.date)
    }
    return transfer
  });

  private _transfers$ = new BehaviorSubject<Transfer[]>([])
  public transfers$ = this._transfers$.asObservable()
  
  constructor(private utilService: UtilService, private userService: UserService) { }

  public saveTransfer(transfer: Transfer){
    const newTransfer: Transfer = {
      ...transfer,
      _id: this.utilService.makeId(),
      date: new Date()
    };
    let loggedinUser = this.userService.getLoggedInUser();
    let transferAmount = transfer.amount;
    let loggedInUserCoins = loggedinUser.coins;
    if(transferAmount > +loggedInUserCoins ||  +loggedInUserCoins - transferAmount <= 0){
      return console.log('cannot complete transfer') 
    }
    this._transfersDb.push(newTransfer)
    this.utilService.saveToStorage(this.TRANSFER_KEY, this._transfersDb)
    this.userService.saveTransferToUser(newTransfer)
    let loggedinUserTransfers = this._transfersDb.filter(transfer => transfer.fromUserId === loggedinUser._id);
    this.utilService.saveToStorage(this.LOGGEDINUSER_TRANSFERS_KEY, loggedinUserTransfers)
    this._transfers$.next(loggedinUserTransfers);
  }

  getContactTransfers(id: string){
    return this._transfersDb.find(transfer=> transfer.toContactId === id);
  }

}
