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

}
