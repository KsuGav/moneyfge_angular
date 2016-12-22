import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { User } from '../../services/service.user';
import { AppState } from '../../app.service';

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

  private secs: number = 0;

  private interval;

  private errorMsg: string;

  @Input()
  public smsId: number;

  constructor(
    private appState: AppState,
    private userService: User
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

  sendAgain(){
    // if(this.smsId){
    //
    // }
    // console.log(this.smsId)
    // this.userService
    //   .sendSms(this.smsId)
    //   .subscribe(
    //     res =>
    //   )
    if (this.secs > 0 && this.secs < 60) {
      return;
    }
    this.secs = 60;
    this.interval = setInterval(() => {
      if (this.secs === 0) {
        clearInterval(this.interval);
        this.secs = 60;
        return;
      }
      this.secs -= 1;
    }, 1000);
    this.userService
      .sendSms(this.appState.get('sms'))
      .subscribe(
        res => this.appState.set('sms', res.sms),
        err => this.errorMsg = err.json().message
      )
    ;
  }
}
