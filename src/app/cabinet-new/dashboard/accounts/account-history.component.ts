import { Component, ViewChild  } from '@angular/core';
import { OnInit } from '@angular/core';
import { n_AccountService } from '../../../app.services/Account.service';
import { AccountHistoryRecord } from '../../../app.models/AccountHistoryRecord.model';

@Component({
    selector: 'account-history-component',
    templateUrl: 'account-history.component.html'
})
export class AccountHistoryComponent implements OnInit {

    history: AccountHistoryRecord[] = [];

    constructor(
        private accountService: n_AccountService
    ){
        this.accountService.onGetAccountHistory.subscribe(
            res => {
                this.history = res;
                console.log('got history for account');
            }
        );
    }

    ngOnInit() {
        this.getHistory();
    }

    getHistory() {
        //!todo: got history for current account
        this.accountService.getAccountHistory(10000018);
    }

}
