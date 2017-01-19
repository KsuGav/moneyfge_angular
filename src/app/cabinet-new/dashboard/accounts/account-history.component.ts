import {Component, ViewChild, OnDestroy, Input} from '@angular/core';
import { OnInit } from '@angular/core';
import { n_AccountService } from '../../../app.services/Account.service';
import { AccountHistoryRecord } from '../../../app.models/AccountHistoryRecord.model';
import { LoaderComponent } from "../../../common-new/loader/loader.component";

declare const $: any;

@Component({
    selector: 'account-history-component',
    templateUrl: 'account-history.component.html'
})
export class AccountHistoryComponent implements OnInit, OnDestroy {

    history: AccountHistoryRecord[] = [];
    noHistory: Boolean = false;
    today: number = Date.now();

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

                // convert infos
                for(let i in this.history) {
                    let infoObj = JSON.parse(this.history[i].info);

                    if('undefined' !== typeof infoObj.CardFrom) {
                        let pre = this.history[i].znak_sum == '+' ? 'Transfer from ' : 'Transfer to ';
                        this.history[i].info = pre + infoObj.CardFrom;
                    }
                }

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
        this.showMore();

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

    showMore(){
        $('.expenses-latest-bills_footer__showmore').click(function () {
        //       let contentHistory = $('.expenses-latest-bills_content');
            // $(this).toggleClass('active');
        $('.expenses-latest-bills_footer__showmore').toggleClass('active');
            // if(contentHistory.hasClass('opened')){
            //     contentHistory.removeClass('opened')
            //         .animate({'height':'225px'},2000)
            // } else{
            //     contentHistory.addClass('opened')
            //         .animate({'height':'400px'},2000)
            // }
                // .slideDown("slow",function(){
                // $('.expenses-latest-bills_content').animate({'max-height':'none'})
            // });
            $('.expenses-latest-bills_content').toggleClass('opened');
        //         .slideDown("slow",function(){
        //         $('.expenses-latest-bills_content').css({'max-height':'none'})
        //     });
        });
    }

}


