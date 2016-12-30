import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppState } from '../app.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Account } from '../app.models/Account.model';

@Injectable()
export class n_AccountService {

  constructor(
    private http: Http,
    private appState: AppState
  ) {

  }

  getAllAccounts() {
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
        res.active.map((acc: any) => active.push(new Account(acc.id, acc.user.id, acc.currency, acc.sum)));
        res.lock.map((acc: any) => lock.push(new Account(acc.id, acc.user.id, acc.currency, acc.sum)));
        res.deleted.map((acc: any) => deleted.push(new Account(acc.id, acc.user.id, acc.currency, acc.sum)));
        return {active, lock, deleted};
      })
    ;
  }

  createCard(currency, types) {
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
