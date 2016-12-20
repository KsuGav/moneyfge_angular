import { Component } from '@angular/core';
import { OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../services/service.user';
import { AccountService } from '../../../services/account.service';
import { ModalService } from '../../../services/modal.service';
import { AppState } from '../../../app.service';

declare const $: any;

@Component({
  selector: 'transfer-account-component',
  templateUrl: './transfer-account.component.html',
  styleUrls: [

  ]
})

export class TransferAccountComponent implements OnInit, AfterViewInit, OnDestroy {

  private accs;

  private msg;

  private fromAccount: string;

  private toAccount: string;

  private sum: string;

  constructor(
    private User: User,
    public router: Router,
    private accountService: AccountService,
    private modalService: ModalService,
    private appState: AppState
  ) {

  }

  submitForm(event) {
    event.preventDefault();
    this.accountService
      .createTransactionStep1(
        this.fromAccount,
        this.toAccount,
        this.sum
      )
      .subscribe(
        res => {
          const code = prompt('Enter SMS code');
          if (code && parseInt(code, 10) !== NaN) {
            this.accountService
              .createTransactionStep2(res.sms, res.info, code)
              .subscribe(
                () => {
                  this.router.navigate(['/en/user/cabinet/score/index'])
                },
                err => this.msg = err.json().message
              )
            ;
          }
        },
        err => this.msg = err.json().message
      )
    ;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.modalService.showUnderConstruction();
    this.getAccounts();
  }

  ngOnDestroy() {

  }

  getAccounts() {
    this.accountService
      .getAllCard()
      .subscribe(
        res => this.accs = res.active,
        err => this.msg = err.json().message
      )
    ;
  }

}

