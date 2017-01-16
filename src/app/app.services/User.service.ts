import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AppService } from './App.service';
import { User } from '../app.models/User.model';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class UserService {

  constructor(
    private _http: Http,
    private _appService: AppService
  ) { }

  getUserInfo() {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);

    const locUrl = `${this._appService.get('apiEndpoint')}/user/`;
    return this._http
        .get(locUrl, {headers: headers})
        .map(res => res.json())
        ;
  }

  sendSms(sms: number, isAToken: boolean = false) {
    const headers = new Headers();
    if (isAToken) {
      headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);
    } else {
      headers.append('Authorization', `Bearer ${sessionStorage.getItem('gToken')}`);
    }

    const locUrl = `${this._appService.get('apiEndpoint')}/sms/${sms}`;
    return this._http
      .put(locUrl, null, {headers: headers})
      .map(res => res.json())
    ;
  }

  toggleSmsNotifications() {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);

    const locUrl = `${this._appService.get('apiEndpoint')}/user/sms`;
    return this._http
        .put(locUrl, null, {headers: headers})
        .map(res => res.json())
        ;
  }

  copyUserInfo(source: User, destination: User) {
    for(let k in source) destination[k] = source[k];
  }

}
