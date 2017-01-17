import { Component, ViewChild } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../../../services/account.service';
import { ModalService } from '../../../services/modal.service';
import { ConfirmDialogComponent } from '../../../common/confirm-dialog';
import { SmsCodeDialogComponent } from '../../../common/sms-code-dialog';
import { SmsModel } from '../../../common/sms-code-dialog/sms.model';
import { AlertComponent } from '../../../common/alert';

declare const $: any;

@Component({
  selector: 'score-index-component',
  templateUrl: './score-index.component.html'
})
export class ScoreIndexComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(ConfirmDialogComponent) confirm: ConfirmDialogComponent;

  @ViewChild(SmsCodeDialogComponent) smsCode: SmsCodeDialogComponent;

  @ViewChild(AlertComponent) alert: AlertComponent;

  private smsModel: SmsModel = new SmsModel();

  private cards;

  private accId: number;

  constructor(
    public router: Router,
    private accountService: AccountService,
    private modalService: ModalService
  ) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.modalService.showLoader('block');
    this.getAccounts();
  }

  ngOnDestroy () {

  }

  getAccounts() {
    this.accountService
      .getAllCards()
      .subscribe(
        res => {
          this.cards = res;
          this.modalService.hideLoader('block');
          this.modalService.hideLoader('active');
          this.modalService.hideLoader('locked');
        },
        err => {
          this.alert.show('danger', err.json().message);
          this.modalService.hideLoader('block');
          this.modalService.hideLoader('active');
          this.modalService.hideLoader('locked');
        }
      )
    ;
  }

  openConfirm(event, accId) {
    event.preventDefault();
    this.accId = accId;
    this.confirm.open();
  }

  lockAccount() {
    this.modalService.showLoader('active');
    this.accountService
      .lockAccount(this.accId)
      .subscribe(
        () => this.getAccounts(),
        err => {
          this.alert.show('danger', err.json().message);
          this.modalService.hideLoader('active');
        }
      )
    ;
  }

  unlockAccount(event, accId) {
    event.preventDefault();
    this.accId = accId;
    this.modalService.showLoader('locked');
    this.accountService
      .unlockAccountStep1(accId)
      .subscribe(
        (res: any) => {
          this.modalService.hideLoader('locked');
          this.smsModel.smsId = res.sms;
          this.smsCode.openCode();
        },
        err => {
          this.alert.show('danger', err.json().message);
          this.modalService.hideLoader('locked');
        }
      )
    ;
  }

  closeSmsDialog(smsModel) {
    if (smsModel.smsCode === '') {
      return;
    }
    this.modalService.showLoader('locked');
    this.accountService
      .unlockAccountStep2(this.accId, smsModel.smsId, +smsModel.smsCode)
      .subscribe(
        () => {
          this.getAccounts();
        },
        err => {
          this.alert.show('danger', err.json().message);
          this.modalService.hideLoader('locked');
        }
      )
    ;
  }

}
