import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SubmitResult } from '../../cabinet/settings/profile/SubmitResult';

declare const $: any;

@Component({
  selector: 'sms-code-dialog-component',
  templateUrl: './sms-code-dialog.component.html'
})

export class SmsCodeDialogComponent implements OnInit {
  @Output()
  sendCode: EventEmitter<String> = new EventEmitter<String>();

  private smsDialog;

  private smsCode;

  constructor(

  ) { }

  ngOnInit() {
    this.smsDialog = $('#phone-sms-dialog');
  }

openCode(){
  this.smsDialog.modal('show');
}
  closeSmsDialog(){
    this.smsDialog.modal('hide');
    this.sendCode.emit(this.smsCode);
  }
}
