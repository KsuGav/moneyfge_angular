import { Component, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';

import { DialogComponent } from '../dialog/dialog.component';
import { SmsCode } from '../../app.models/SmsCode.model';
import { TimerLinkComponent } from '../../common-new/timer-link/timer-link.component';
import { UserService } from '../../app.services/User.service';

declare const toastr: any;

@Component({
  selector: 'sms-dialog-component',
  templateUrl: 'sms-dialog.component.html'
})
export class SmsDialogComponent {

  constructor(
    private _userService: UserService
  ) { }

  private _smsCode: SmsCode = new SmsCode(0, 0);

  @Output() onSendCode: EventEmitter<SmsCode> = new EventEmitter<SmsCode>();

  @ViewChild('dialog') dialog: DialogComponent;

  @ViewChild('code') code: ElementRef;

  @ViewChild('timerLink') timerLink: TimerLinkComponent;

  beforeOpen() {
    this.code.nativeElement.value = '';
  }

  afterClose() {
    this.timerLink.reset();
  }

  sendCode() {
    const code = this.code.nativeElement.value;
    if (code === '' || isNaN(code)) {
      return;
    }
    this._smsCode.smsCode = +code;
    this.onSendCode.emit(this._smsCode);
    this.dialog.close();
  }

  open(smsId: number) {
    this._smsCode.smsId = smsId;
    this.dialog.open();
  }

  handleSendSmsAgain() {
    this.code.nativeElement.value = '';
    this._userService
      .sendSms(this._smsCode.smsId, true)
      .subscribe(
        (res: any) => {
          this._smsCode.smsId = res.sms;
        },
        err => {
          this.dialog.close();
          toastr.error(err.json().message);
        }
      )
    ;
  }

}
