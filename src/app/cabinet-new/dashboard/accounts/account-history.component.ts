import {Component, ViewChild, OnDestroy, Input} from '@angular/core';
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

    getSubscription;
    reqSubscription;

    @ViewChild('accountHistoryLoader') historyLoader: LoaderComponent;
    @Input() isForAll: boolean = false;

    constructor(
        private accountService: n_AccountService
    ){
        this.getSubscription = this.accountService.onGetAccountHistory.subscribe(
            res => {
                this.history = res;
                console.log(res.length);
                // let a = JSON.parse(this.history[0].info).CardFrom

                //     console.log('card '+a);
                // }
                this.noHistory = !res || res.length < 1;
                this.historyLoader.toggle(false);
            }
        );

        this.reqSubscription = this.accountService.onRequestAccountHistory.subscribe(
            () => {
                this.historyLoader.toggle(true);
            }
        );
    }

    ngOnInit() {
        this.getHistory();
        if(this.isForAll) {
            this.accountService.getAccountHistory(undefined);
        }
    }

    ngOnDestroy() {
        this.getSubscription.unsubscribe();
        this.reqSubscription.unsubscribe();
    }

    getHistory() {
        this.historyLoader.toggle(true);
    }

}
