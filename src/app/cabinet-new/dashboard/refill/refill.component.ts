import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Account} from "../../../app.models/Account.model";
import {n_AccountService} from "../../../app.services/Account.service";
import {LoaderComponent} from "../../../common-new/loader/loader.component";

declare const $: any;

@Component({
    selector: 'refill-component',
    templateUrl: 'refill.component.html'
})

export class RefillComponent implements OnInit, OnDestroy {

    activeAccounts: Account[];
    getAccountsSubscription;
    reqAccountsSubscription;

    toAccount: number;
    sum: number;
    sumToPay: string = '0.00';
    formValid: boolean;

    @ViewChild('accountLoader') accountLoader: LoaderComponent;

    constructor(
        public accountService: n_AccountService,
    ) {}

    ngOnInit(){
        this.activeLink();
        this.formatcards();
        this.accountLoader.toggle(true);

        this.accountService.getAllAccounts();

        this.reqAccountsSubscription = this.accountService.requestAccounts
            .subscribe(() => {
                this.accountLoader.toggle(true);
            });

        this.getAccountsSubscription = this.accountService.receiveAccounts
            .subscribe(
                res => {
                    this.accountLoader.toggle(false);
                    this.activeAccounts = res.active;
                }
            )
    }

    ngOnDestroy(){
        this.unActiveLink();
    }

    activeLink(){
        $('#refill_link').addClass('active')
    }

    unActiveLink(){
        $('#refill_link').removeClass('active')
    }

    formatcards(){
        $(".select-medium").select2({
            minimumResultsForSearch: Infinity
        });

        function formatCustom (option) {
            if (!option.id) { return option.text; }
            var $option = $(
                '<span><img src="/assets/new_assets/img/' + option.element.value.toLowerCase() + '.png" class="transfer-img" /> ' + option.text + '</span>'
            );
            return $option;
        };

        $(".transfer-select.custom").select2({
            templateResult: formatCustom,
            templateSelection: formatCustom,
            minimumResultsForSearch: Infinity
        });

        function formatTransfer (bill) {
            var $bill = $(
                '<span><img src="/assets/new_assets/img/favicon/favicon1.png" class="transfer-img" /> ' + bill.text + '</span>'
            );
            return $bill;
        };

        $(".transfer-select.bill").select2({
            templateResult: formatTransfer,
            templateSelection: formatTransfer,
            minimumResultsForSearch: Infinity,
            placeholder: 'Choose account'
        });
    }

    onToChange(account) {
        this.toAccount = 0;
        if(account && account.length == 8) {
            this.toAccount = account;
        }
        this.validateForm();
    }

    onSumChange(sum) {
        sum = parseFloat(sum);
        this.sum = sum;
        this.validateForm();
        if(!sum || sum == 0) {
            this.sumToPay = this.formatMoney(0);
            return;
        }
        this.sumToPay = this.formatMoney(
            Math.max(1.05 * sum, sum + 0.01)
        );
    }

    validateForm() {
        this.formValid = (this.toAccount > 10000000 && this.toAccount < 99999999 &&
        this.sum > 0);
    }

    formatMoney(sum) {
        return sum.toFixed(2).replace(/./g, function(c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        });
    }
}

