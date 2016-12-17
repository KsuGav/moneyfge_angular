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
    headers.append('Authorization', `Bearer ${this.appState.get('aToken')}`);

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
    var headers = new Headers();
    headers.append('Authorization', `Bearer ${this.appState.get('aToken')}`);

    var locUrl = `${this.appState.get('apiEndpoint')}/accounts/`;
    return this.http
      .get(locUrl, {headers: headers})
      .map(res => res.json())
    ;
  }

}
