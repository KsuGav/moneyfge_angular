import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../app.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class OutbidService {

  constructor(
    private http: Http,
    private appState: AppState
  ) {

  }

  createOutbid(sum, descr, sys, sysNum, acc) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);

    const localData = {
      "bidSumm": sum,
      "descr": descr,
      "system": sys,
      "sysNumber": sysNum,
      "account": acc
    };

    const locUrl = `${this.appState.get('apiEndpoint')}/accs/bid`;
    return this.http
      .post(locUrl, JSON.stringify(localData), {headers: headers})
      .map(res => res.json())
    ;
  }

  allOutbids() {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);

    const locUrl = `${this.appState.get('apiEndpoint')}/accs/bid`;
    return this.http
      .get(locUrl, {headers: headers})
      .map(res => res.json())
    ;
  }

}
