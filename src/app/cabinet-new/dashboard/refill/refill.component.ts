import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Account} from "../../../app.models/Account.model";
import {n_AccountService} from "../../../app.services/Account.service";
import {UserService} from "../../../app.services/User.service";
import {LoaderComponent} from "../../../common-new/loader/loader.component";

declare const $: any;
declare const V: any;
declare const toastr: any;

@Component({
    selector: 'refill-component',
    templateUrl: 'refill.component.html'
})

export class RefillComponent implements OnInit, OnDestroy {

    activeAccounts: Account[];
    getAccountsSubscription;
    reqAccountsSubscription;
    visaCheckoutSubscription;

    toAccount: number;
    sum: number;
    sumToPay: string = '0.00';
    formValid: boolean;

    currentAccount: Account;

    @ViewChild('accountLoader') accountLoader: LoaderComponent;

    constructor(
        public accountService: n_AccountService,
        public userService: UserService,
    ) {}

    ngOnInit(){
        this.activeLink();
        this.initUi();
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

    initUi(){
        let thisObj = this;
        $(".select-medium").select2({
            minimumResultsForSearch: Infinity
        }).on("change", function (e) {
            thisObj.toAccount = e.target.value;
            thisObj.initVisaCheckout();
            thisObj.currentAccount = null;
            for(let i in thisObj.activeAccounts) {
                if(thisObj.activeAccounts[i].id == e.target.value) {
                    thisObj.currentAccount = thisObj.activeAccounts[i];
                }
            }
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
        console.log(account);
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

        this.initVisaCheckout();
    }

    validateForm() {
        this.formValid = (this.toAccount > 10000000 && this.toAccount < 99999999 &&
        this.sum > 0);
        return this.formValid;
    }

    formatMoney(sum) {
        return sum.toFixed(2).replace(/./g, function(c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        });
    }


    initVisaCheckout() {
        if(!this.formValid) {
            return;
        }
        console.log('initing');

        let currency = this.currentAccount.currency;
        let sum = Math.max(1.05 * this.sum, this.sum + 0.01);

        let refillObj = this;
        V.init({
            apikey: "4ZDWBWHMTX2OOMIFORMD21SuvUQu1KZ02Cw9om2qdes8LAfxQ",
            referenceCallID: "",
            paymentRequest: {
                currencyCode: currency,
                total: sum
            },
            locale: "en_US",
            settings: {
                locale: "en_US",
                logoUrl: "https://moneyfge.com/assets/new_assets/img/logo.png",
                displayName: "MoneyFGE"
            }
        });

        V.on("payment.success", function(payment) {
            refillObj.visaCheckoutSubscription = refillObj.userService.visaCheckout(refillObj.toAccount, payment.callid)
                .subscribe(
                    (res: any) => {
                        refillObj.visaCheckoutSubscription.unsubscribe();

                    },
                    err => {
                        toastr.error(err.json().message);
                    }
                );
            toastr.success(`The refill was successfully`);
            //вызываем из сервиса функцию визаЧекаут, она возвращает результат. из креате рефилл проверяем, если "status": 1(success),выводим через тоастр Саксес, если 2(эррор) - выводим эррор
            //пэймент возвращает account and call_id
        });
        V.on("payment.cancel", function(payment) {
            console.log("cancel", payment);
        });
        V.on("payment.error", function(payment, error) {
            console.log("error", payment, error);
        });
    }
}

