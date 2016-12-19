import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../app.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class User {

  private siteEndpoint: string;

  private apiEndpoint: string;

  private clientId: string;

  private clientSecret: string;

  constructor(
    private http: Http,
    private appState: AppState,
    private router: Router
  ) {
    this.siteEndpoint = 'http://moneyfge-new.localhost/app_dev.php';
    this.apiEndpoint = `${this.siteEndpoint}/api/v1`;

    this.clientId = '3_p08hEG4THmS3TPlOpS9cYqsh9Aj3vxGUYN8XtmxWLjVtfzoqHg';
    this.clientSecret = '7LYlYxmWBhyjosH3RvRybyCyogmOODppWo6YTLOgBljujlmHSB';
  }

  registStep1(telephone) {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('gToken')}`);
    headers.append('Content-Type', 'application/json');

    const localData = {
      "telephone": telephone,
      "reference": ''
    };

    const locUrl = `${this.appState.get('apiEndpoint')}/users/step/1/`;
    return this.http
      .post(locUrl, JSON.stringify(localData), {headers: headers})
      .map(res => res.json())
    ;
  }

  registStep2(code, telephone) {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('gToken')}`);
    headers.append('Content-Type', 'application/json');

    const localData = {
      "code": code,
      "telephone": telephone
    };

    const locUrl = `${this.appState.get('apiEndpoint')}/users/step/2/`;
    return this.http
      .post(locUrl, JSON.stringify(localData), {headers: headers})
      .map(res => res.json())
    ;
  }

  registStep3(plainPassword, telephone) {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('gToken')}`);
    headers.append('Content-Type', 'application/json');

    const localData = {
      "plainPassword": plainPassword,
      "telephone": telephone
    };

    const locUrl = `${this.appState.get('apiEndpoint')}/users/step/3/`;
    return this.http
      .post(locUrl, JSON.stringify(localData), {headers: headers})
      .map(res => res.json())
    ;
  }

  getUser() {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);

    const locUrl = `${this.appState.get('apiEndpoint')}/user/`;
    return this.http
      .get(locUrl, {headers: headers})
      .map(res => res.json())
      // .map(res => this.appState.set('user', res))
    ;
  }

  sendSms(sms) {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('gToken')}`);

    const locUrl = `${this.appState.get('apiEndpoint')}/sms/${sms}`;
    return this.http
      .put(locUrl, null, {headers: headers})
      .map(res => res.json())
    ;
  }

  ressetPassword(phone) {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('gToken')}`);
    headers.append('Content-Type', 'application/json');

    const localData = {
      "telephone": phone
    };

    const locUrl = `${this.appState.get('apiEndpoint')}/users/resset/`;
    return this.http
      .post(locUrl, JSON.stringify(localData), {headers: headers})
      .map(res => res.json())
    ;
  }

  changePassword(oldPass, newPass, againPass) {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);
    headers.append('Content-Type', 'application/json');

    const localData = {
      "oldPassword": oldPass,
      "plainPassword": [newPass, againPass]
    };

    const locUrl = `${this.appState.get('apiEndpoint')}/user/password`;
    return this.http
      .put(locUrl, JSON.stringify(localData), {headers: headers})
      .map(res => res.json())
    ;
  }
















  getConfig() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var locURL = this.siteEndpoint + '/api/v1/configs';
    return this.http.get(locURL, {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  getConfigById(a_token) {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.siteEndpoint + '/api/v1/configs/2';
    return this.http.get(locURL, {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  updateConfigById(a_token, telephone) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + a_token);

    var localData = {
      "telephone": telephone
    };

    var locURL = this.siteEndpoint + '/api/v1/user/1/number/';
    return this.http.put(locURL, JSON.stringify(localData), {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  addConfig(a_token, setting, value, enable) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + a_token);

    var localData = {
      "setting": setting,
      "value": value,
      "enable": enable
    };

    var locURL = this.siteEndpoint + '/api/v1/configs/';
    return this.http.post(locURL, JSON.stringify(localData), {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }


  lockUnlockConfigById(a_token) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.siteEndpoint + '/api/v1/configs/6';
    return this.http.delete(locURL).map(res => {
      console.log(res.json());
    });
  }




  /*----------------Accounts-------------*/

  getCard(a_token, currency) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.siteEndpoint + '/api/v1/accounts/10000000/?currency=' + currency ;
    return this.http.get(locURL, {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }


  getHistoryCard(a_token, currency) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.siteEndpoint + '/api/v1/accounts/history/10000000/?currency=' + currency ;
    return this.http.get(locURL, {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  getAllHistoryCard(a_token, currency) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.siteEndpoint + '/api/v1/accounts/history/?currency=' + currency ;
    return this.http.get(locURL, {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  deletedAccount(a_token) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.siteEndpoint + '/api/v1/accounts/10000006/';
    return this.http.delete(locURL,  {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  activeCardStep1(a_token) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.siteEndpoint + '/api/v1/accounts/active/10000006/1/';
    return this.http.put(locURL, {}, {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  activeCardStep2(a_token, sms, code) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);
    headers.append('Content-Type', 'application/json');

    var localData = {
      "sms": sms,
      "code": code
    };

    var locURL = this.siteEndpoint + '/api/v1/accounts/active/10000006/2/';
    return this.http.put(locURL, JSON.stringify(localData), {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }


  /*---------------------------------User----------------------------*/

  successEmail() {

    var locURL = 'http://bigra.git/app_dev.php/email/1/NmU4MDYxYThlMzI4YmVlMmE5NmRkNDZjZjk4YzYyNTYwYzhhODY5N2ViNzY4ZDNhY2NmYjU0M2M2YjlmNGUyMQ';
    return this.http.get(locURL).map(res => {
      console.log(res.json());
    });
  }

  getReference(a_token) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);
    headers.append('Content-Type', 'application/json');

    var locURL = this.siteEndpoint + '/api/v1/users/reference/';
    return this.http.get(locURL).map(res => {
      console.log(res.json());
    });

  }

  updateUser(a_token, firstName, secondName, paspotr, birthday, country, city) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);
    headers.append('Content-Type', 'application/json');

    var localData = {
      "firstName": firstName,
      "secondName": secondName,
      "paspotr": paspotr,
      "birthday": birthday,
      "country": country,
      "city": city
    };

    var locURL = this.siteEndpoint + '/oauth/v1/user';
    return this.http.put(locURL, JSON.stringify(localData), {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  changeUserNumber(a_token, plainPassword, oldTelephone, telephone) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);
    headers.append('Content-Type', 'application/json');

    var localData = {
      "plainPassword": plainPassword,
      "oldTelephone": oldTelephone,
      "telephone": telephone
    };

    var locURL = this.siteEndpoint + '/api/v1/user/phone/1';
    return this.http.put(locURL, JSON.stringify(localData), {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  chnageEmail(a_token, plainPassword, email) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);
    headers.append('Content-Type', 'application/json');

    var localData = {
      "plainPassword": plainPassword,
      "email": email
    };

    var locURL = this.siteEndpoint + '/api/v1/user/email/1';
    return this.http.put(locURL, JSON.stringify(localData), {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }
  changeUserNumberStep2(a_token, plainPassword, email) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);
    headers.append('Content-Type', 'application/json');

    var localData = {
      "plainPassword": plainPassword,
      "email": email
    };

    var locURL = this.siteEndpoint + '/api/v1/user/email/1';
    return this.http.patch(locURL, JSON.stringify(localData), {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  changeUserEmailStep2(a_token, sms, history, code) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);
    headers.append('Content-Type', 'application/json');

    var localData = {
      "sms": sms,
      "history": history,
      "code": code
    };

    var locURL = this.siteEndpoint + '/api/v1/user/email/2';
    return this.http.patch(locURL, JSON.stringify(localData), {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }
}
