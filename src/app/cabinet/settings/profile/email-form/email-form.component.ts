import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { User } from '../../../../services/service.user';
import { ModalService } from '../../../../services/modal.service';
import { SubmitResult } from '../SubmitResult';
import { ChangeEmailModel } from './ChangeEmailModel';

import { SmsCodeDialogComponent } from '../../../../common/sms-code-dialog/sms-code-dialog.component';

declare const $: any;

@Component({
  selector: 'email-form-component',
  templateUrl: 'email-form.component.html'
})
export class EmailFormComponent implements OnInit {

  @Output()
  submitCompleted: EventEmitter<SubmitResult> = new EventEmitter<SubmitResult>();

  private user: any;

  private smsCode: string;

  private smsDialog;

  private submitResult: SubmitResult = new SubmitResult();

  private model: ChangeEmailModel = new ChangeEmailModel();

  @ViewChild(SmsCodeDialogComponent) phoneCode: SmsCodeDialogComponent;

  constructor(
    private userService: User,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.smsDialog = $('#email-sms-dialog');
    this.getUser();
  }

  getUser() {
    this.userService
      .getUser()
      .subscribe(
        res => {
          this.user = res;
          this.model.email = res.email;
          this.submitCompleted.emit(this.submitResult);
        }
      )
    ;
  }

  submitForm(event) {
    event.preventDefault();
    this.modalService.showLoader('email-form');
    this.userService
      .changeUserEmailStep1(
        this.model.password,
        this.model.email
      )
      .subscribe(
        res => {
          this.model.smsId = res.sms;
          this.model.history = res.history;
          this.modalService.hideLoader('email-form');
          // this.smsDialog.modal('show');
          this.phoneCode.openCode()
        },
        err => {
          this.submitResult.type = 'danger';
          this.submitResult.msg = err.json().message;
          this.modalService.hideLoader('email-form');
          this.submitCompleted.emit(this.submitResult);
        }
      )
    ;
  }

  closeSmsDialog() {
    if (this.smsCode === '') {
      return;
    }
    // this.smsDialog.modal('hide');
    this.modalService.showLoader('email-form');
    this.model.code = +this.smsCode;
    this.smsCode = '';
    this.userService
      .changeUserEmailStep2(
        this.model.smsId,
        this.model.history,
        this.model.code
      )
      .subscribe(
        res => {
          this.submitResult.type = 'success';
          this.submitResult.msg = 'You have to validate you email address. On your email has been sent link.';
          this.modalService.hideLoader('email-form');
          this.submitCompleted.emit(this.submitResult);
          this.getUser();
          this.model.password = '';
        },
        err => {
          this.submitResult.type = 'danger';
          this.submitResult.msg = err.json().message;
          this.modalService.hideLoader('email-form');
          this.submitCompleted.emit(this.submitResult);
        }
      )
    ;
  }

}
