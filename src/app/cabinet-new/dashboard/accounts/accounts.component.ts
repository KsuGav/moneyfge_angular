import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';

import { Account } from '../../../app.models/Account.model';
import { n_AccountService } from '../../../app.services/Account.service';
import { LoaderComponent } from '../../../common-new/loader/loader.component';
import { DialogComponent } from '../../../common-new/dialog/dialog.component';
import { SmsDialogComponent } from '../../../common-new/sms-dialog/sms-dialog.component';
import { SmsCode } from '../../../app.models/SmsCode.model';

declare const toastr: any;

@Component({
  selector: 'accounts-component',
  templateUrl: 'accounts.component.html'
})
export class AccountsComponent implements OnInit {

  @ViewChild('accountsLoader') accountsLoader: LoaderComponent;

  @ViewChild('confirmLock') confirmLock: DialogComponent;

  @ViewChild('smsDialog') smsDialog: SmsDialogComponent;

  active: Account[] = [];

  lock: Account[] = [];

  private _id: number; // number of account to be locked / unlocked

  constructor(
    private accountService: n_AccountService
  ) {
    this.accountService.requestAccounts.subscribe(
      () => {
        this.accountsLoader.toggle(true);
      }
    );

    this.accountService.receiveAccounts.subscribe(
      res => {
        this.accountsLoader.toggle(false);
        this.active = res.active;
        this.lock = res.lock;
      }
    );
  }

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService
      .getAllAccounts();
  }

  handleConfirmLock(id: number) {
    this._id = id;
    this.confirmLock.open();
  }

  handleLock() {
    this.confirmLock.close();
    this.accountsLoader.toggle(true);
    this.accountService
      .lockAccount(this._id)
      .subscribe(
        () => {
          this.accountService.getAllAccounts();
          toastr.success('Account lock successfully');
        },
        err => {
          this.confirmLock.close();
          toastr.error(err.json().message);
        }
      )
    ;
  }

  unlockStep1(id: number) {
    this.accountsLoader.toggle(true);
    this._id = id;
    this.accountService
      .unlockAccountStep1(this._id)
      .subscribe(
        (res: any) => {
          this.accountsLoader.toggle(false);
          this.smsDialog.open(res.sms);
        },
        err => {
          this.accountsLoader.toggle(false);
          toastr.error(err.json().message);
        }
      )
    ;
  }

  unlockStep2(smsCode: SmsCode) {
    this.accountsLoader.toggle(true);
    this.accountService
      .unlockAccountStep2(this._id, smsCode.smsId, smsCode.smsCode)
      .subscribe(
        () => {
          this.accountService.getAllAccounts();
          toastr.success('Account unlock successfully');
        },
        err => {
          this.accountsLoader.toggle(false);
          toastr.error(err.json().message);
        }
      )
    ;
  }

}
