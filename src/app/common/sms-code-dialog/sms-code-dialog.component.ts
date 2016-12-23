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

  private smsDialogInput;

  private errorMsg: string;


  constructor(
    private userService: User
  ) { }

  ngOnInit() {

  }

  openCode(){
    this.smsDialog = $(`#${this.id}-sms-dialog`);
    this.smsDialogInput = $(`#${this.id}-sms-dialog input`);
    this.smsDialog.modal('show');
  }

  closeSmsDialog(){
    this.smsDialog.modal('hide');
    this.sendCode.emit(this.sms);
  }

  sendAgain(){
    this.userService
      .sendSms(this.sms.smsId, true)
      .subscribe(
        (res: any) => this.sms.smsId = res.sms,
        err => this.errorMsg = err.json().message
      )

  }

  changeValue(event){
    event.preventDefault();
    if(!isNaN(event.key)){
      if(this.smsDialogInput.val().length>=4){ return; }
      this.smsDialogInput.val(this.smsDialogInput.val() + event.key);
    }

  }

}
