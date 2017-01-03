import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { AppService } from './App.service';

@Injectable()
export class ReplenishService {

  constructor(
    private _http: Http,
    private _appService: AppService
  ) { }

  ozon(amount: number, currency: string) {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${sessionStorage.getItem('aToken')}`);
    headers.append('Content-Type', 'application/json');

    const data = {
      currency,
      amount
    };

    const url = `${this._appService.get('apiEndpoint')}/ozon/`;
    return this._http.post(url, JSON.stringify(data), {headers})
      .map(res => res.json())
    ;
  }

}
