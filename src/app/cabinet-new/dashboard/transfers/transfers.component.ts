import {Component, OnInit, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';
import { Account } from '../../../app.models/Account.model';
import { n_AccountService } from '../../../app.services/Account.service';
import {LoaderComponent} from "../../../common-new/loader/loader.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
    sumToPay: string = '0.00';
    private form: FormGroup;

    toAccount: number;
    subscription: any;

    constructor(
        private accountService: n_AccountService,
        private fb: FormBuilder,
        private modalService: ModalService
    ) {

        this.subscription = this.accountService.receiveAccounts.subscribe(
            res => {
                this.accountsLoader.toggle(false);
                this.fromAccounts = res.active;
                this.fromAccountsLoaded = true;
            }
        );
        this.generateForm();
    }

    generateForm() {
        this.form = this.fb.group({
            from: ['', Validators.required],
            to: ['', [Validators.required]],
            sum: ['', [Validators.required, Validators.pattern('[0-9\.\,]+')]],
            comment: ['']
        });
    }

    submitForm() {
        if (!this.form.valid) {
            return;
        }
        this.modalService.showLoader('block');
        this.accountService
            .createTransactionStep1(
                this.form.value.from,
                this.form.value.to,
                this.form.value.sum,
                //this.form.value.comment
            )
            .subscribe(
                (res: any) => {
                    this.smsModel.smsId = res.sms;
                    this.smsInfo = res.info;
                    //this.smsDialog.openCode();
                },
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

        $(".select-medium").select2({
            minimumResultsForSearch: Infinity
        });

        function formatTransfer (bill) {
            var $bill = $(
                '<span><img src="/assets/new_assets/img/favicon/favicon1.png" class="transfer-img" /> ' + bill.text + '</span>'
            );
            return $bill;
        };

        $(".transfer-select").select2({
            templateResult: formatTransfer,
            templateSelection: formatTransfer,
            minimumResultsForSearch: Infinity
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
        console.log(account);
        this.toAccounts = [];
        for(let i = 0; i < this.fromAccounts.length; ++i) {
            console.log(this.fromAccounts[i].id);
            if(this.fromAccounts[i].id != account) {
                this.toAccounts.push(this.fromAccounts[i]);
            }
        }
        console.log(this.toAccounts);
    }

    onToChange(account) {
        if(account) {

        }
    }

    onSumChange(sum) {
        this.sumToPay = this.formatMoney(1.05 * sum)
    }

    formatMoney(sum) {
        return sum.toFixed(2).replace(/./g, function(c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        });
    }
}
