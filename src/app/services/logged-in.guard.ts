import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AppState } from '../app.service';
import { User } from '../services/service.user';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(
    private appState: AppState,
    private router: Router,
    private http: Http,
    private userService: User
  ) {}

  isLoggedIn() {
    return sessionStorage.getItem('loggedIn') === 'true';
  }

  logout() {
    if (this.isLoggedIn()) {
      sessionStorage.removeItem('aToken');
      sessionStorage.setItem('loggedIn', 'false');
      this.appState.set('user', null);
      this.router.navigate(['/en/user/sign-in/login']);
    }
  }

  canActivate() {
    if (this.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/en/user/sign-in/login']);
    return false;
  }

  guestToken(): any {
    const gToken = sessionStorage.getItem('gToken');
    if (gToken !== null) {
      return gToken;
    }
    const url = `${this.appState.get('siteEndpoint')}/oauth/v2/token?client_id=${this.appState.get('clientId')}&client_secret=${this.appState.get('clientSecret')}&grant_type=client_credentials`;
    return this.http
      .get(url)
      .map(res => res.json())
      .subscribe(
        (res: any) => {
          sessionStorage.setItem('gToken', res.access_token);
        }
      )
      ;
  }

  userLoginStep1(username, password) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('gToken')}`);

    const localData = {
      "client_id": this.appState.get('clientId'),
      "client_secret": this.appState.get('clientSecret'),
      "grant_type": 'password',
      "username": username,
      "password": password
    };

    const locURL = `${this.appState.get('apiEndpoint')}/users/login/1`;
    return this.http
      .post(locURL, JSON.stringify(localData), {headers: headers} )
      .map(res => res.json())
    ;
  }

  userLoginStep2(username, password, sms, code) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${this.guestToken()}`);

    const localData = {
      "client_id": this.appState.get('clientId'),
      "client_secret": this.appState.get('clientSecret'),
      "grant_type": 'password',
      "username": username,
      "password": password,
      "sms": sms,
      "code": code
    };

    const locURL = `${this.appState.get('apiEndpoint')}/users/login/2`;
    return this.http
      .post(locURL, JSON.stringify(localData), {headers: headers} )
      .map(res => res.json())
      .map(res => {
        this.appState.set('username', null);
        this.appState.set('password', null);
        this.appState.set('sms', null);
        this.appState.set('user', res);
        return res;
      })
    ;
  }

}
