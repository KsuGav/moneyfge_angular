import { Component, ViewEncapsulation } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
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

  private cards;

  private msg: string;

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
    this.modalService.showLoader('active');
    if (!confirm('Are you sure?')) {
      return;
    }
    this.accountService
      .lockAccount(accId)
      .subscribe(
        () => this.getAccounts(),
        err => {
          this.msg = err.json().message;
          this.modalService.hideLoader('active');
        }
      )
    ;
  }

  unlockAccount(event, accId) {
    event.preventDefault();
    this.modalService.showLoader('locked');
    this.accountService
      .unlockAccountStep1(accId)
      .subscribe(
        res => {
          const sms = res.sms;
          const code = prompt('SMS code');
          if (code && parseInt(code, 10) !== NaN) {
            this.accountService
              .unlockAccountStep2(accId, sms, code)
              .subscribe(
                () => this.getAccounts(),
                err => {
                  this.msg = err.json().message;
                  this.modalService.showLoader('locked');
                }
              )
            ;
          }
        },
        err => this.msg = err.json().message
      )
    ;
  }

}
