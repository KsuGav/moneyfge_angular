import {Component, OnInit, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';
import { Account } from '../../../../app.models/Account.model';
import { n_AccountService } from '../../../../app.services/Account.service';
import {LoaderComponent} from "../../../../common-new/loader/loader.component";
import {ModalService} from "../../../../services/modal.service";
import {SmsCode} from "../../../../app.models/SmsCode.model";
import {SmsDialogComponent} from "../../../../common-new/sms-dialog/sms-dialog.component";


declare const $: any;
declare const toastr: any;

@Component({
    selector: 'account-operations-component',
    templateUrl: 'account_operations.component.html'
})

export class AccountOperationsComponent implements OnInit, OnDestroy, AfterViewInit{

    @ViewChild('loader') loader: LoaderComponent;
    @ViewChild(SmsDialogComponent) smsDialog: SmsDialogComponent;
    @ViewChild('transferAccountsLoader') accountsLoader: LoaderComponent;

    userName: any;
    private smsModel: SmsCode;

    fromAccounts: Account[];
    toAccounts: Account[];
    fromAccountsLoaded: boolean;
    toMyAccount: boolean = true;
    sumToPay: string = '0.00';

    fromAccount: number = 0;
    toAccount: number = 0;
    sum: number = 0.0;
    formValid: boolean = false;

    comment: string = '';

    getAccountsSubscription: any;

    constructor(
        private accountService: n_AccountService,
        private modalService: ModalService
    ) {
        this.getAccountsSubscription = this.accountService.receiveAccounts.subscribe(
            res => {
                // this.accountsLoader.toggle(false);
                this.fromAccounts = res.active;
                this.fromAccountsLoaded = true;
            }
        );
    }

    submitForm() {
        event.preventDefault();
        this.validateForm();
        if (!this.formValid) {
            return;
        }
        this.loader.toggle(true);
        this.modalService.showLoader('block');
        this.accountService
            .createTransactionStep1(
                this.fromAccount,
                this.toAccount,
                this.sum,
            )
            .subscribe(
                (res: any) => {
                    this.loader.toggle(false);
                    this.smsModel = new SmsCode(res.sms, res.info, 0);
                    this.smsDialog.open(this.smsModel.smsId);
                },
                err => {
                    this.loader.toggle(false);
                    this.modalService.hideLoader('block');
                    toastr.error(err.json().message);
                }
            )
        ;
    }

    closeSmsDialog(code: SmsCode) {
        this.smsModel.smsCode = code.smsCode;
        this.modalService.showLoader('block');
        this.loader.toggle(true);
        this.accountService
            .createTransactionStep2(
                this.smsModel.smsId,
                this.smsModel.smsInfo,
                +this.smsModel.smsCode
            )
            .subscribe(
                () => {
                    this.loader.toggle(false);
                    toastr.success("Transfer was successfully conducted.");
                    this.ngOnInit();
                    this.toAccounts = [];
                },

                err => {
                    this.modalService.hideLoader('block');
                    toastr.error(err.json().message);
                }
            )
        ;
    }

    ngOnInit() {
        this.selects();
        this.userName = sessionStorage.getItem('telephone');

        this.toMyAccount = true;
        // this.accountsLoader.toggle(true);
        let a = this.accountService.getAllAccounts();


    }

    ngOnDestroy(){
        this.getAccountsSubscription.unsubscribe();
    }

    ngAfterViewInit(){

    }

    onFromChange(account) {
        this.toAccounts = [];
        for(let i = 0; i < this.fromAccounts.length; ++i) {
            if(this.fromAccounts[i].id != account) {
                this.toAccounts.push(this.fromAccounts[i]);
            }
        }
        this.fromAccount = account;
        if(this.toMyAccount) {
            this.toAccount = 0;
        }
        this.validateForm();
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

    formatMoney(sum) {
        return sum.toFixed(2).replace(/./g, function(c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        });
    }

    onYourAccountSelected() {
        this.toMyAccount = true;
        $('#toMySelect').next().show();
        this.onToChange($('#toMySelect').val());

    }

    validateForm() {
        this.formValid = (this.toAccount > 10000000 && this.toAccount < 99999999 &&
        this.fromAccount > 10000000 && this.fromAccount < 99999999 &&
        this.sum > 0);
    }

    selects(){
        $(".select-medium").select2({
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
            minimumResultsForSearch: Infinity
        });

        function formatCountry (state) {
            if (!state.id) { return state.text; }
            var $state = $(
                '<span><img src="/assets/new_assets/img/flag-' + state.element.value.toLowerCase() + '.png" class="transfer-img" /> ' + state.text + '</span>'
            );
            return $state;
        };

        $(".transfer-select.country").select2({
            templateResult: formatCountry,
            templateSelection: formatCountry,
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

        let thisObj = this;

        $("#fromMySelect").select2({
            placeholder: 'Select account',
            templateResult: formatTransfer,
            templateSelection: formatTransfer,
            minimumResultsForSearch: Infinity,
        }).on("change", function(e) {
            thisObj.onFromChange(e.currentTarget.value);
        });

        $("#toMySelect").select2({
            placeholder: 'Select account',
            templateResult: formatTransfer,
            templateSelection: formatTransfer,
            minimumResultsForSearch: Infinity,
        }).on("change", function(e) {
            thisObj.onToChange(e.currentTarget.value);
        });
    }
}