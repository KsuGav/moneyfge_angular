import { Component, ViewChild  } from '@angular/core';
import { OnInit } from '@angular/core';
import { n_AccountService } from '../../../app.services/Account.service';
import { AccountHistoryRecord } from '../../../app.models/AccountHistoryRecord.model';
import { LoaderComponent } from "../../../common-new/loader/loader.component";

@Component({
    selector: 'account-history-component',
    templateUrl: 'account-history.component.html'
})
export class AccountHistoryComponent implements OnInit {

    history: AccountHistoryRecord[] = [];
    noHistory: Boolean = false;

    @ViewChild('accountHistoryLoader') historyLoader: LoaderComponent;

    constructor(
        private accountService: n_AccountService
    ){
        this.accountService.onGetAccountHistory.subscribe(
            res => {
                this.history = res;
                this.noHistory = !res || res.length < 1;
                this.historyLoader.toggle(false);
                console.log('got history for account');
            }
        );
    }

    ngOnInit() {
        this.getHistory();
    }

    getHistory() {
        this.historyLoader.toggle(true);
        //this.accountService.getAccountHistory(this.accountService.initialAccountId);
    }

}
