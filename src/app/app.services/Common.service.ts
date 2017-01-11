import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AppService } from './App.service';

@Injectable()
export class CommonService {

    onGetMoneyCourses: EventEmitter<any> = new EventEmitter<any>();
    onGetMoneyCoursesError: EventEmitter<String> = new EventEmitter<String>();

    constructor(
        private _http: Http,
        private _appService: AppService
    ) { }

    getMoneyCourse() {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${sessionStorage.getItem('gToken')}`);

        const locUrl = `${this._appService.get('apiEndpoint')}/currency/header/`;
        return this._http
            .get(locUrl, {headers: headers})
            .map(res => res.json())
            .subscribe(
                (res: any) => this.onGetMoneyCourses.emit(res),
                err => this.onGetMoneyCoursesError.emit(err.json().message)
            )
            ;
    }
}
