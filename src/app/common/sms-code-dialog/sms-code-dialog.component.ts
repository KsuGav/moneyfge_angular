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

    console.log(this.smsId);
    this.userService
      .sendSms(this.smsId)
      .subscribe(
        res => {
          this.smsId = res.sms;
          console.log(this.smsId)
        },
        err => {this.errorMsg = err.json().message;
                console.log(err)
        }
      )

  }
}
