import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { User } from '../../services/service.user';
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

  private smsDialog;

  private smsDialogInput;

  private errorMsg: string;


  constructor(
    private userService: User
  ) { }

  ngOnInit() {
    this.smsDialog = $('#phone-sms-dialog');
    this.smsDialogInput = $('#phone-sms-dialog input');
  }

openCode(){
  this.smsDialog.modal('show');
  this.smsDialogInput.val('');

}
  closeSmsDialog(){
    this.smsDialog.modal('hide');
    this.sendCode.emit(this.sms);
  }

  sendAgain(){
    this.userService
      .sendSms(this.sms.smsId, true)
      .subscribe(
        res => this.sms.smsId = res.sms,
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
