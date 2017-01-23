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

  changeNumberStep1(oldNumber, newNumber, password) {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);
    headers.append('Content-Type', 'application/json');

    const payload = JSON.stringify({
      "plainPassword": password,
      "oldTelephone": oldNumber,
      "telephone": newNumber
    });

    const locUrl = `${this._appService.get('apiEndpoint')}/user/phone/1`;
    return this._http
        .put(locUrl, payload, {headers: headers})
        .map(res => res.json())
        ;
  }

  changeStep2(sms, history, code, entity = 'number') {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);
    headers.append('Content-Type', 'application/json');

    const paylaoad = {
      "sms": sms,
      "history": history,
      "code": code
    };

    let locUrl = "";
    switch(entity) {
      case 'number': {
        locUrl = `${this._appService.get('apiEndpoint')}/user/phone/2`;
        break;
      }
      case 'email': {
        locUrl = `${this._appService.get('apiEndpoint')}/user/email/2`;
        break;
      }
      default: {
        throw "ChangeStep2 entity error";
      }
    }
    return this._http
        .patch(locUrl, JSON.stringify(paylaoad), {headers: headers})
        .map(res => res.json())
        ;
  }

  copyUserInfo(source: User, destination: User) {
    for(let k in source) destination[k] = source[k];
  }

  changeEmailStep1(newEmail, password) {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);
    headers.append('Content-Type', 'application/json');

    const payload = JSON.stringify({
      "plainPassword": password,
      "email": newEmail
    });

    const locUrl = `${this._appService.get('apiEndpoint')}/user/email/1`;
    return this._http
        .put(locUrl, payload, {headers: headers})
        .map(res => res.json())
        ;
  }

  changePassword(oldPassword, newPassword) {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);
    headers.append('Content-Type', 'application/json');

    const payload = JSON.stringify({
      "plainPassword": [newPassword, newPassword],
      "oldPassword": oldPassword
    });

    const locUrl = `${this._appService.get('apiEndpoint')}/user/password`;
    return this._http
        .put(locUrl, payload, {headers: headers})
        .map(res => res.json())
        ;
  }

  //not ready
  visaCheckout(account, call_id){
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);
    headers.append('Content-Type', 'application/json');

    const payload = JSON.stringify({
      "account": account,
      "call_id": call_id
    });
    console.log(payload);
    const locUrl = `${this._appService.get('apiEndpoint')}api/v1/refill`;
    return this._http
        .post(locUrl, payload, {headers: headers})
        .map(res => res.json())
        ;
  }

  //MERCHANT

  getIsMerchant(){
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);
    headers.append('Content-Type', 'application/json');

    const locUrl = `${this._appService.get('apiEndpoint')}/merchant/exists/`;
    return this._http
        .get(locUrl, {headers: headers})
        .map(res => res.json())
        ;

  }

  getMerchant(){
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);
    headers.append('Content-Type', 'application/json');

    const locUrl = `${this._appService.get('apiEndpoint')}/merchant/`;
    return this._http
        .get(locUrl, {headers: headers})
        .map(res => res.json())
        ;
  }

  createMerchant(country,org_type,site_url,f_name,l_name,email,telephone){
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);
    headers.append('Content-Type', 'application/json');

    const info = JSON.stringify({
      "country": country,
      "organization_type": org_type,
      "site_url": site_url,
      "first_name": f_name,
      "last_name": l_name,
      "email": email,
      "telephone": telephone
    });
    const locUrl = `${this._appService.get('apiEndpoint')}/merchant/`;
    return this._http
        .post(locUrl, info, {headers: headers})
        .map(res => res.json())
        ;

  }

}
