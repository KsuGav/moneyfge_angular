import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class User {

  private urlSite: string;

  private clientId: string;

  private clientSecret: string;

  private loggedIn: boolean;

  constructor(private http: Http) {
    this.urlSite = 'http://moneyfge-new.localhost/app_dev.php';
    this.clientId = '1_8fuw5sfdaw0kinans8xfvpr7kpmkht9wetyqr4t86jiuwi7vwb';
    this.clientSecret = 'kmo97rvc357livmrz1raeg27s98rjudamr90ou2xpfodh0am7r';

    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  guestToken() {
    return localStorage.getItem('g_token');
  }

  getConfig() {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var locURL = this.urlSite + '/api/v1/configs';
    return this.http.get(locURL, {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  getConfigById(a_token) {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.urlSite + '/api/v1/configs/2';
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

    var locURL = this.urlSite + '/api/v1/user/1/number/';
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

    var locURL = this.urlSite + '/api/v1/configs/';
    return this.http.post(locURL, JSON.stringify(localData), {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }


  lockUnlockConfigById(a_token) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.urlSite + '/api/v1/configs/6';
    return this.http.delete(locURL).map(res => {
      console.log(res.json());
    });
  }




  /*----------------Accounts-------------*/

  createCard(a_token, currency, types) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + a_token);

    var localData = {
      "currency": currency,
      "types": types
    };

    var locURL = this.urlSite + '/api/v1/accounts/';
    return this.http.post(locURL, JSON.stringify(localData), {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  getAllCard(a_token, currency) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.urlSite + '/api/v1/accounts/?currency=' + currency ;
    return this.http.get(locURL, {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  getCard(a_token, currency) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.urlSite + '/api/v1/accounts/10000000/?currency=' + currency ;
    return this.http.get(locURL, {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }


  getHistoryCard(a_token, currency) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.urlSite + '/api/v1/accounts/history/10000000/?currency=' + currency ;
    return this.http.get(locURL, {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  getAllHistoryCard(a_token, currency) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.urlSite + '/api/v1/accounts/history/?currency=' + currency ;
    return this.http.get(locURL, {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  LockAccount(a_token) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.urlSite + '/api/v1/accounts/lock/10000005/';
    return this.http.put(locURL, {}, {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  unlockCardStep1(a_token) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.urlSite + '/api/v1/accounts/unlock/10000000/1';
    return this.http.put(locURL, {}, {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  unlockCardStep2(a_token, sms, code) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);
    headers.append('Content-Type', 'application/json');

    var localData = {
      "sms": sms,
      "code": code
    };

    var locURL = this.urlSite + '/api/v1/accounts/unlock/10000000/2';
    return this.http.put(locURL, JSON.stringify(localData), {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  createTransactionStep1(a_token, CardFrom, CardTo, Sum) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);
    headers.append('Content-Type', 'application/json');

    var localData = {
      "CardFrom": CardFrom,
      "CardTo": CardTo,
      "Sum": Sum
    };

    var locURL = this.urlSite + '/api/v1/accounts/transaction/1';
    return this.http.post(locURL, JSON.stringify(localData), {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  createTransactionStep2(a_token, sms, info, code) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);
    headers.append('Content-Type', 'application/json');

    var localData = {
      "sms": sms,
      "info": info,
      "code": code
    };

    var locURL = this.urlSite + '/api/v1/accounts/transaction/2';
    return this.http.post(locURL, JSON.stringify(localData), {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  deletedAccount(a_token) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.urlSite + '/api/v1/accounts/10000006/';
    return this.http.delete(locURL,  {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  activeCardStep1(a_token) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.urlSite + '/api/v1/accounts/active/10000006/1/';
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

    var locURL = this.urlSite + '/api/v1/accounts/active/10000006/2/';
    return this.http.put(locURL, JSON.stringify(localData), {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }


  /*---------------------------------User----------------------------*/

  userLogin(username, password) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${this.guestToken()}`);

    const localData = {
      "client_id": this.clientId,
      "client_secret": this.clientSecret,
      "grant_type": 'password',
      "username": username,
      "password": password
    };

    var locURL = `${this.urlSite}/api/v1/users/login/1`;
    return this.http
      .post(locURL, JSON.stringify(localData), {headers: headers} )
      .map(res => {
        res.json();
      }).subscribe(
        res => console.log(res),
        err => console.error(`ERROR: ${err}`)
      );
  }

  getGuestToken() {
    if (localStorage.getItem('g_token')) {
      return;
    }
    const url = `${this.urlSite}/oauth/v2/token?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=client_credentials`
    return this.http
      .get(url)
      .map(res => res.json())
      .subscribe(
        (res: any) => {
          localStorage.setItem('g_token', res.access_token);
        }
      );
  }

  getUser(a_token) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.urlSite + '/api/v1/user/';
    return this.http.get(locURL).map(res => {
      console.log(res.json());
    });
  }

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

    var locURL = this.urlSite + '/api/v1/users/reference/';
    return this.http.get(locURL).map(res => {
      console.log(res.json());
    });

  }

  registStep1(a_token, telephone) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);
    headers.append('Content-Type', 'application/json');

    var localData = {
      "telephone": telephone,
      "reference": '4vqzcqv44t8gkc800000ss0c0w8wgo0'
    };

    var locURL = this.urlSite + '/api/v1/users/step/1/';
    return this.http.post(locURL, JSON.stringify(localData), {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  registStep2(a_token, code, telephone) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);
    headers.append('Content-Type', 'application/json');

    var localData = {
      "code": code,
      "telephone": telephone
    };

    var locURL = this.urlSite + '/api/v1/users/step/2/';
    return this.http.post(locURL, JSON.stringify(localData), {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }


  registStep3(a_token, plainPassword, telephone) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);
    headers.append('Content-Type', 'application/json');

    var localData = {
      "plainPassword": plainPassword,
      "telephone": telephone
    };

    var locURL = this.urlSite + '/api/v1/users/step/3/';
    return this.http.post(locURL, JSON.stringify(localData), {headers: headers} ).map(res => {
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

    var locURL = this.urlSite + '/oauth/v1/user';
    return this.http.put(locURL, JSON.stringify(localData), {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  changePassword(a_token, oldPassword, plainPassword) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);
    headers.append('Content-Type', 'application/json');

    var localData = {
      "oldPassword": oldPassword,
      "plainPassword": plainPassword
    };

    var locURL = this.urlSite + '/api/v1/user/password';
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

    var locURL = this.urlSite + '/api/v1/user/phone/1';
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

    var locURL = this.urlSite + '/api/v1/user/email/1';
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

    var locURL = this.urlSite + '/api/v1/user/email/1';
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

    var locURL = this.urlSite + '/api/v1/user/email/2';
    return this.http.patch(locURL, JSON.stringify(localData), {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }
}
