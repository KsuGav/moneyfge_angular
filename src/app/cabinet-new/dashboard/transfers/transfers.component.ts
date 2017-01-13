import {Component, OnInit, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';
import { Account } from '../../../app.models/Account.model';
import { n_AccountService } from '../../../app.services/Account.service';
import {LoaderComponent} from "../../../common-new/loader/loader.component";
import {ModalService} from "../../../services/modal.service";
import {SmsCode} from "../../../app.models/SmsCode.model";
import {SmsDialogComponent} from "../../../common-new/sms-dialog/sms-dialog.component";
import {DialogComponent} from "../../../common-new/dialog/dialog.component";

declare const $: any;

@Component({
    selector: 'transfers-component',
    templateUrl: 'transfers.component.html'
})

export class TransfersComponent implements OnInit, OnDestroy, AfterViewInit{

    @ViewChild('transferAccountsLoader') accountsLoader: LoaderComponent;
    @ViewChild(SmsDialogComponent) smsDialog: SmsDialogComponent;
    @ViewChild(DialogComponent) alert: DialogComponent;

    private smsModel: SmsCode = new SmsCode(123,123);
    private smsInfo: number;

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

    subscription: any;

    constructor(
        private accountService: n_AccountService,
        private modalService: ModalService
    ) {

        this.subscription = this.accountService.receiveAccounts.subscribe(
            res => {
                this.accountsLoader.toggle(false);
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
        this.modalService.showLoader('block');
        this.smsDialog.open(123);
        return;
        // this.accountService
        //     .createTransactionStep1(
        //         this.fromAccount,
        //         this.toAccount,
        //         this.sum,
        //         //this.form.value.comment
        //     )
        //     .subscribe(
        //         (res: any) => {
        //             this.smsModel.smsId = res.sms;
        //             this.smsInfo = res.info;
        //             this.smsDialog.open(this.smsModel.smsId);
        //         },
        //         err => {
        //             this.modalService.hideLoader('block');
        //             //this.alert.show('danger', err.json().message);
        //         }
        //     )
        // ;
    }

    closeSmsDialog() {
        this.modalService.showLoader('block');
        this.accountService
            .createTransactionStep2(
                this.smsModel.smsId,
                this.smsInfo,
                +this.smsModel.smsCode
            )
            .subscribe(
                //() => this.router.navigate(['/user/cabinet/score/index']),
                err => {
                    this.modalService.hideLoader('block');
                    //this.alert.show('danger', err.json().message);
                }
            )
        ;
    }

    ngOnInit(){
        this.accountsLoader.toggle(true);
        this.accountService.getAllAccounts();
        this.setSelect();
        this.activeLink();
        this.setScrollOff();
    }

    ngAfterViewInit(){
        this.moveDot();
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
        this.unActiveLink();
    }

    activeLink(){
        $('#transfers_link').addClass('active')
    }

    unActiveLink(){
        $('#transfers_link').removeClass('active')
    }

    setSelect(){
        //Selects
        $("#Phones1").select2();

        function formatTransfer (bill) {
            var $bill = $(
                '<span><img src="/assets/new_assets/img/favicon/favicon1.png" class="transfer-img" /> ' + bill.text + '</span>'
            );
            return $bill;
        };

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

        $('.equal-height-column').equalHeights();
        $('.equal-expenses').equalHeights();
        $('.account-fill-equal-1').equalHeights();
        $('.account-fill-equal-2').equalHeights();
        $('.account-fill-equal-3').equalHeights();
    }

    setScrollOff() {
        // disable mousewheel on a input number field when in focus
        // (to prevent Cromium browsers change the value when scrolling)
        $('body').on('focus', 'input[type=number]', function (e) {
            $(this).on('mousewheel.disableScroll', function (e) {
                e.preventDefault()
            })
        });
        $('body').on('blur', 'input[type=number]', function (e) {
            $(this).off('mousewheel.disableScroll')
        });
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
        $('.dot').animate({"marginLeft":"0px"}, 500);
    }

    onOnesAccountSelected() {
        this.toMyAccount = false;
        $('#toMySelect').next().hide();
        this.onToChange($('#transferToInput').val());
        $('.dot').animate({"marginLeft":"25px"}, 500);
    }

    validateForm() {
        // console.log([this.toAccount, this.fromAccount, this.sum]);
        this.formValid = (this.toAccount > 10000000 && this.toAccount < 99999999 &&
            this.fromAccount > 10000000 && this.fromAccount < 99999999 &&
            this.sum > 0);
        // console.log(this.formValid);
    }

    moveDot(){
        let self= this;
        $('.s2').on('click', function(){
            if($(this).children().first().css('margin-left')==='0px'){
                $('.dot').animate({"marginLeft":"25px"}, 500);
                self.toMyAccount = false;
                $('#toMySelect').next().hide();
                self.onToChange($('#transferToInput').val());

            } else{
                self.toMyAccount = true;
                $('.dot').animate({"marginLeft":"0px"}, 500);
                $('#toMySelect').next().show();
                self.onToChange($('#toMySelect').val());
            }
        })
    }

}
