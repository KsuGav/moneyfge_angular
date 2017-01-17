import { Component, ViewChild  } from '@angular/core';
import { OnInit } from '@angular/core';
import { n_AccountService } from '../../../app.services/Account.service';
import { AccountHistoryRecord } from '../../../app.models/AccountHistoryRecord.model';
import { LoaderComponent } from "../../../common-new/loader/loader.component";

declare const $: any;

@Component({
    selector: 'account-history-component',
    templateUrl: 'account-history.component.html'
})
export class AccountHistoryComponent implements OnInit {

    history: AccountHistoryRecord[] = [];
    noHistory: Boolean = false;
    today: number = Date.now();

    subscription;

    @ViewChild('accountHistoryLoader') historyLoader: LoaderComponent;

    constructor(
        private accountService: n_AccountService
    ){
        this.subscription = this.accountService.onGetAccountHistory.subscribe(
            res => {
                this.history = res;
                console.log(res.length);
                // let a = JSON.parse(this.history[0].info).CardFrom
                //     console.log('card '+a);

                this.noHistory = !res || res.length < 1;
                this.historyLoader.toggle(false);
                console.log('got history for account');
            }
        );
    }

    ngOnInit() {
        this.getHistory();
        this.setupElements();
        this.showMore();

    }

    setupElements() {

    }

    getHistory() {
        this.historyLoader.toggle(true);
        //this.accountService.getAccountHistory(this.accountService.initialAccountId);
    }

    showMore(){
        $('.expenses-latest-bills_footer__showmore').click(function () {
            $(this).toggleClass('active');
            $('.expenses-latest-bills_content').toggleClass('opened');
        });
    }

}
