import {Component, ViewChild, OnDestroy} from '@angular/core';
import { OnInit } from '@angular/core';
import { n_AccountService } from '../../../app.services/Account.service';
import { AccountHistoryRecord } from '../../../app.models/AccountHistoryRecord.model';
import { LoaderComponent } from "../../../common-new/loader/loader.component";

@Component({
    selector: 'account-history-component',
    templateUrl: 'account-history.component.html'
})
export class AccountHistoryComponent implements OnInit, OnDestroy {

    history: AccountHistoryRecord[] = [];
    noHistory: Boolean = false;

    subscription;

    @ViewChild('accountHistoryLoader') historyLoader: LoaderComponent;

    constructor(
        private accountService: n_AccountService
    ){
        this.subscription = this.accountService.onGetAccountHistory.subscribe(
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
        this.setupElements();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    setupElements() {

    }

    getHistory() {
        this.historyLoader.toggle(true);
    }

}
