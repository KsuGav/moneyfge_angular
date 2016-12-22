import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { ChangePhoneModel } from './ChangePhoneModel';
import { User } from '../../../../services/service.user';
import { ModalService } from '../../../../services/modal.service';
import { SubmitResult } from '../SubmitResult';

import { SmsCodeDialogComponent } from '../../../../common/sms-code-dialog/sms-code-dialog.component';

declare const $: any;

@Component({
  selector: 'phone-form-component',
  templateUrl: './phone-form.component.html'
})
export class PhoneFormComponent implements OnInit {

  @Output()
  submitCompleted: EventEmitter<SubmitResult> = new EventEmitter<SubmitResult>();

  private user;

  private smsCode: string;

  private model = new ChangePhoneModel();

  //private smsDialog;

  private submitResult: SubmitResult = new SubmitResult();

  @ViewChild(SmsCodeDialogComponent) phoneCode: SmsCodeDialogComponent;

  constructor(
    private userService: User,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    //this.smsDialog = $('#phone-sms-dialog');
    this.getUser();
  }

  getUser() {
    this.userService
      .getUser()
      .subscribe(
        res => {
          this.user = res;
          this.model.oldNumber = res.telephone;
          this.model.newNumber = '';
          this.model.password = '';
          this.modalService.hideLoader('phone-form');
        }
      )
    ;
  }

  submitForm(event) {
    event.preventDefault();
    this.modalService.showLoader('phone-form');
    this.userService
      .changeUserNumberStep1(
        this.model.password,
        this.model.oldNumber,
        this.model.newNumber
      )
      .subscribe(
        res => {
          this.model.smsId = res.sms;
          this.model.history = res.history;
          this.modalService.hideLoader('phone-form');
          //this.smsDialog.modal('show');
          this.phoneCode.openCode()
        },
        err => {
          this.submitResult.type = 'danger';
          this.submitResult.msg = err.json().message;
          this.modalService.hideLoader('phone-form');
          this.submitCompleted.emit(this.submitResult);
        }
      )
    ;
  }

  closeSmsDialog() {
    if (this.smsCode === '') {
      return;
    }
    //this.smsDialog.modal('hide');
    this.phoneCode.openCode()
    this.modalService.showLoader('phone-form');
    this.model.smsCode = +this.smsCode;
    this.userService
      .changeUserNumberStep2(
        this.model.smsId,
        this.model.history,
        this.model.smsCode
      )
      .subscribe(
        res => {
          this.submitResult.type = 'success';
          this.submitResult.msg = 'Telephone updated successfully';
          this.submitCompleted.emit(this.submitResult);
          this.getUser();
        },
        err => {
          this.submitResult.type = 'danger';
          this.submitResult.msg = err.json().message;
          //this.smsDialog.modal('hide');
          this.submitCompleted.emit(this.submitResult);
          this.modalService.hideLoader('phone-form');
        }
      )
    ;
  }

  showCode(event){
    console.log(event);
  }

}
