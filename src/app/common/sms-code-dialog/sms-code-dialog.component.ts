import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { User } from '../../services/service.user';
import { AppState } from '../../app.service';
import { SmsModel} from './sms.model';

declare const $: any;

@Component({
  selector: 'sms-code-dialog-component',
  templateUrl: './sms-code-dialog.component.html'
})

export class SmsCodeDialogComponent implements OnInit {
  @Output()
  sendCode: EventEmitter<SmsModel> = new EventEmitter<SmsModel>();

  @Input()
  public sms: SmsModel = new SmsModel();

  @Input()
  public id: string = 'default';

  private smsDialog;

  private secs: number = 0;

  private interval;

  private errorMsg: string;

  constructor(
    private appState: AppState,
    private userService: User
  ) { }

  ngOnInit() {

  }

  openCode(){
    this.smsDialog = $(`#${this.id}-sms-dialog`);
    this.smsDialog.modal('show');
  }

  closeSmsDialog(){
    this.smsDialog.modal('hide');
    this.sendCode.emit(this.sms);
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

    this.userService
      .sendSms(this.sms.smsId, true)
      .subscribe(
        (res: any) => this.sms.smsId = res.sms,
        err => this.errorMsg = err.json().message
      )

  }
}
