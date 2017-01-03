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
    // headers.append('Authorization', `Bearer YjRiM2UyZWM1YmY1MDlmMDc3ZjNjYTZhNTZjZThjMTA4Y2Q0YTY1MWFiZGM0ODAxNGMzN2QyODA0NTk0ZjM4ZA`);
    headers.append('Content-Type', 'application/json');

    const data = {
      currency,
      amount
    };

    const url = `${this._appService.get('apiEndpoint')}/ozon/`;
    // const url = 'https://moneyfge.com/backend/web/app_dev.php/api/v1/ozon/';
    return this._http
      .post(url, JSON.stringify(data), {headers})
      .map(res => res.json())
    ;
  }

}
