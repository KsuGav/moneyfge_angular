import { Component, ViewEncapsulation } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { ModalService } from '../../../services/modal.service';

declare const $: any;

@Component({
  selector: 'score-index-component',
  templateUrl: './score-index.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: []
})
export class ScoreIndexComponent implements OnInit, AfterViewInit, OnDestroy {

  private smsCode: string;

  private smsId: number;

  private smsDialog;

  private confirmDialog;

  private cards;

  private msg: string;

  private accId: number;

  constructor(
    public router: Router,
    private accountService: AccountService,
    private modalService: ModalService
  ) {

  }

  ngOnInit() {
    this.smsDialog = $('#account-sms-dialog');
    this.confirmDialog = $('#account-confirm-dialog');
  }

  ngAfterViewInit() {
    this.modalService.showLoader('block');
    this.getAccounts();
  }

  ngOnDestroy () {

  }

  getAccounts() {
    this.accountService
      .getAllCard()
      .subscribe(
        res => {
          this.cards = res;
          this.modalService.hideLoader('block');
          this.modalService.hideLoader('active');
          this.modalService.hideLoader('locked');
        },
        err => {
          this.msg = err.json().message;
          this.modalService.hideLoader('block');
          this.modalService.hideLoader('active');
          this.modalService.hideLoader('locked');
        }
      )
    ;
  }

  lockAccount(event, accId) {
    event.preventDefault();
    this.accId = accId;
    this.confirmDialog.modal('show');
  }

  unlockAccount(event, accId) {
    event.preventDefault();
    this.accId = accId;
    this.modalService.showLoader('locked');
    this.accountService
      .unlockAccountStep1(accId)
      .subscribe(
        res => {
          this.modalService.hideLoader('locked');
          this.smsId = res.sms;
          this.smsDialog.modal('show');
        },
        err => {
          this.msg = err.json().message;
          this.modalService.hideLoader('locked');
        }
      )
    ;

    this.smsDialog.modal('show');
  }

  closeSmsDialog() {
    this.smsDialog.modal('hide');
    this.modalService.showLoader('locked');
    const code = this.smsCode;
    this.smsCode = '';
    if (code && parseInt(code, 10) !== NaN) {
      this.accountService
        .unlockAccountStep2(this.accId, this.smsId, +code)
        .subscribe(
          () => {
            this.getAccounts();
          },
          err => {
            this.msg = err.json().message;
            this.modalService.hideLoader('locked');
          }
        )
      ;
    }

  }

  closeConfirmDialog() {
    this.confirmDialog.modal('hide');
    this.modalService.showLoader('active');
    this.accountService
      .lockAccount(this.accId)
      .subscribe(
        () => this.getAccounts(),
        err => {
          this.msg = err.json().message;
          this.modalService.hideLoader('active');
        }
      )
    ;
  }

  cancelConfirmDialog() {
    this.confirmDialog.modal('hide');
  }

}
