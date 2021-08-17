import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

  export class UtilService {
    public makeId(length = 5) {
        var txt = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
          txt += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return txt;
      }

      public saveToStorage(key: string, val: any) {
        localStorage.setItem(key, JSON.stringify(val))
    }
    
    public loadFromStorage(key: string) {
        var val = localStorage.getItem(key)
        return JSON.parse(val)
    }
  }
