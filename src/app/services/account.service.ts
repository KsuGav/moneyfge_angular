import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../app.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AccountService {

  constructor(
    private http: Http,
    private appState: AppState
  ) {

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

  getAllCard() {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);

    const locUrl = `${this.appState.get('apiEndpoint')}/accounts/`;
    return this.http
      .get(locUrl, {headers: headers})
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
