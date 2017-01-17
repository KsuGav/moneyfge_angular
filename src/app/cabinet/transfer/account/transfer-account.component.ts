import { Component, ViewChild } from '@angular/core';
import { OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '../../../services/account.service';
import { ModalService } from '../../../services/modal.service';
import { SmsCodeDialogComponent } from '../../../common/sms-code-dialog';
import { SmsModel } from '../../../common/sms-code-dialog/sms.model';
import { AlertComponent } from '../../../common/alert';

declare const $: any;

@Component({
  selector: 'transfer-account-component',
  templateUrl: './transfer-account.component.html'
})

export class TransferAccountComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(SmsCodeDialogComponent) smsDialog: SmsCodeDialogComponent;

  @ViewChild(AlertComponent) alert: AlertComponent;

  private smsModel: SmsModel = new SmsModel();

  private accs;

  private form: FormGroup;

  private info: number;

  constructor(
    public router: Router,
    private accountService: AccountService,
    private modalService: ModalService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      from: ['', Validators.required],
      to: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      sum: ['', [Validators.required]]
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
        this.form.value.sum
      )
      .subscribe(
        (res: any) => {
          this.smsModel.smsId = res.sms;
          this.info = res.info;
          this.smsDialog.openCode();
        },
        err => {
          this.modalService.hideLoader('block');
          this.alert.show('danger', err.json().message);
        }
      )
    ;
  }

  closeSmsDialog() {
    this.modalService.showLoader('block');
    this.accountService
      .createTransactionStep2(
        this.smsModel.smsId,
        this.info,
        +this.smsModel.smsCode
      )
      .subscribe(
        () => this.router.navigate(['/user/cabinet/score/index']),
        err => {
          this.modalService.hideLoader('block');
          this.alert.show('danger', err.json().message);
        }
      )
    ;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.modalService.showUnderConstruction();
    this.modalService.showLoader('block');
    this.getAccounts();
  }

  ngOnDestroy() {

  }

  getAccounts() {
    this.accountService
      .getAllCards()
      .subscribe(
        res => {
          this.modalService.hideLoader('block');
          this.accs = res.active;
        },
        err => {
          this.modalService.hideLoader('block');
          this.alert.show('danger', err.json().message);
        }
      )
    ;
  }

}

