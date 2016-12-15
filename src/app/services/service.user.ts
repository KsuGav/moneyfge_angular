import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class User {

  private siteEndpoint: string;

  private apiEndpoint: string;

  private clientId: string;

  private clientSecret: string;

  private loggedIn: boolean;

  constructor(private http: Http) {
    this.siteEndpoint = 'http://moneyfge-new.localhost/app_dev.php';
    this.apiEndpoint = `${this.siteEndpoint}/api/v1`;

    this.clientId = '3_p08hEG4THmS3TPlOpS9cYqsh9Aj3vxGUYN8XtmxWLjVtfzoqHg';
    this.clientSecret = '7LYlYxmWBhyjosH3RvRybyCyogmOODppWo6YTLOgBljujlmHSB';

    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  isLoggedIn() {
    return this.loggedIn;
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

  createCard(a_token, currency, types) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + a_token);

    var localData = {
      "currency": currency,
      "types": types
    };

    var locURL = this.siteEndpoint + '/api/v1/accounts/';
    return this.http.post(locURL, JSON.stringify(localData), {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  getAllCard(a_token, currency) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.siteEndpoint + '/api/v1/accounts/?currency=' + currency ;
    return this.http.get(locURL, {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

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

  LockAccount(a_token) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.siteEndpoint + '/api/v1/accounts/lock/10000005/';
    return this.http.put(locURL, {}, {headers: headers} ).map(res => {
      console.log(res.json());
    });
  }

  unlockCardStep1(a_token) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.siteEndpoint + '/api/v1/accounts/unlock/10000000/1';
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

    var locURL = this.siteEndpoint + '/api/v1/accounts/unlock/10000000/2';
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

    var locURL = this.siteEndpoint + '/api/v1/accounts/transaction/1';
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

    var locURL = this.siteEndpoint + '/api/v1/accounts/transaction/2';
    return this.http.post(locURL, JSON.stringify(localData), {headers: headers} ).map(res => {
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

  guestToken() {
    const gToken = sessionStorage.getItem('g_token');
    if (gToken !== null) {
      return gToken;
    }
    const url = `${this.siteEndpoint}/oauth/v2/token?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=client_credentials`;
    return this.http
      .get(url)
      .map(res => res.json())
      .subscribe(
        (res: any) => {
          sessionStorage.setItem('g_token', res.access_token);
        }
      )
      ;
  }

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

    const locURL = `${this.apiEndpoint}/users/login/1`;
    return this.http
      .post(locURL, JSON.stringify(localData), {headers: headers} )
      .map(res => res.json())
      .map((response: any) => {
        if (!('error' in response)) {
          if (!('sms' in response)) {
            sessionStorage.setItem('a_token', response.access_token);
            this.loggedIn = true;
          }
        }
        return response;
      })
    ;
  }

  userLogin1(username, password, sms, code) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${this.guestToken()}`);

    const localData = {
      "client_id": this.clientId,
      "client_secret": this.clientSecret,
      "grant_type": 'password',
      "username": username,
      "password": password,
      "sms": sms,
      "code": code
    };

    const locURL = `${this.apiEndpoint}/users/login/2`;
    return this.http
      .post(locURL, JSON.stringify(localData), {headers: headers} )
      .map(res => res.json())
      .map((response: any) => {
        if (!('error' in response)) {
          sessionStorage.setItem('a_token', response.access_token);
          this.loggedIn = true;
        }
      })
      ;
  }

  getUser(a_token) {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + a_token);

    var locURL = this.siteEndpoint + '/api/v1/user/';
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

    var locURL = this.siteEndpoint + '/api/v1/users/reference/';
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

    var locURL = this.siteEndpoint + '/api/v1/users/step/1/';
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

    var locURL = this.siteEndpoint + '/api/v1/users/step/2/';
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

    var locURL = this.siteEndpoint + '/api/v1/users/step/3/';
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

    var locURL = this.siteEndpoint + '/oauth/v1/user';
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

    var locURL = this.siteEndpoint + '/api/v1/user/password';
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
