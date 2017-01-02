import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppState } from '../app.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Account } from '../app.models/Account.model';

export const CURRENCIES: string[] = [
  'USD',
  'EUR',
  'UAH',
  'RUB'
];

@Injectable()
export class n_AccountService {

  requestAccounts: EventEmitter<any> = new EventEmitter<any>();

  receiveAccounts: EventEmitter<any> = new EventEmitter<any>();

  receiveAccountsError: EventEmitter<String> = new EventEmitter<String>();

  constructor(
    private http: Http,
    private appState: AppState
  ) {

  }

  getAllAccounts() {
    this.requestAccounts.emit('request accounts');
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);

    const locUrl = `${this.appState.get('apiEndpoint')}/accounts/`;
    return this.http
      .get(locUrl, {headers: headers})
      .map(res => res.json())
      .map((res: any) => {
        let active = [];
        let lock = [];
        let deleted = [];
        res.active.map((acc: any) => active.push(new Account(
          acc.id, acc.user.id, acc.currency, acc.sum, acc.lock, acc.delete, !(acc.lock || acc.delete)
        )));
        res.lock.map((acc: any) => lock.push(new Account(
          acc.id, acc.user.id, acc.currency, acc.sum, acc.lock, acc.delete, !(acc.lock || acc.delete)
        )));
        res.deleted.map((acc: any) => deleted.push(new Account(
          acc.id, acc.user.id, acc.currency, acc.sum, acc.lock, acc.delete, !(acc.lock || acc.delete)
        )));
        return {active, lock, deleted};
      })
      .subscribe(
        (res: any) => this.receiveAccounts.emit(res),
        err => this.receiveAccountsError.emit(err.json().message)
      )
    ;
  }

  createCard(currency: string, types: string = 'card') {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);

    const localData = {
      "currency": currency,
      "types": types
    };

    const locUrl = `${this.appState.get('apiEndpoint')}/accounts/`;
    return this.http
      .post(locUrl, JSON.stringify(localData), {headers: headers})
      .map(res => res.json())
      .map((res: any) => new Account(
        res.id, res.user.id, res.currency, res.sum, res.lock, res.delete, !(res.lock || res.delete)
      ))
    ;
  }

  lockAccount(accId) {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);

    const locUrl = `${this.appState.get('apiEndpoint')}/accounts/lock/${accId}/`;
    return this.http
      .put(locUrl, {}, {headers: headers})
      .map(res => res.json())
    ;
  }

  unlockAccountStep1(accId) {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);

    const locUrl = `${this.appState.get('apiEndpoint')}/accounts/unlock/${accId}/1/`;
    return this.http
      .put(locUrl, {}, {headers: headers})
      .map(res => res.json())
    ;
  }

  unlockAccountStep2(accId, sms, code) {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);
    headers.append('Content-Type', 'application/json');

    const localData = {
      "sms": sms,
      "code": code
    };

    const locUrl = `${this.appState.get('apiEndpoint')}/accounts/unlock/${accId}/2/`;
    return this.http
      .put(locUrl, JSON.stringify(localData), {headers: headers})
      .map(res => res.json())
    ;
  }

  createTransactionStep1(fromAccount, toAccount, sum) {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);
    headers.append('Content-Type', 'application/json');

    const localData = {
      "CardFrom": fromAccount,
      "CardTo": toAccount,
      "Sum": sum
    };

    const locUrl = `${this.appState.get('apiEndpoint')}/accounts/transaction/1/`;
    return this.http
      .post(locUrl, JSON.stringify(localData), {headers: headers})
      .map(res => res.json())
    ;
  }

  createTransactionStep2(sms, info, code) {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);
    headers.append('Content-Type', 'application/json');

    const localData = {
      "sms": sms,
      "info": info,
      "code": code
    };

    const locUrl = `${this.appState.get('apiEndpoint')}/accounts/transaction/2/`;
    return this.http
      .post(locUrl, JSON.stringify(localData), {headers: headers})
      .map(res => res.json())
    ;
  }

}
