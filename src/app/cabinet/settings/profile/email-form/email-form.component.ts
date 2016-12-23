import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';

import { User } from '../../../../services/service.user';
import { ModalService } from '../../../../services/modal.service';
import { SubmitResult } from '../SubmitResult';
import { ChangeEmailModel } from './ChangeEmailModel';
import { SmsCodeDialogComponent } from '../../../../common/sms-code-dialog';
import { SmsModel } from '../../../../common/sms-code-dialog/sms.model';

declare const $: any;

@Component({
  selector: 'email-form-component',
  templateUrl: 'email-form.component.html'
})
export class EmailFormComponent implements OnInit {

  @Output()
  submitCompleted: EventEmitter<SubmitResult> = new EventEmitter<SubmitResult>();

  private user: any;

  private emailValidator: string = '(.+)@(.+){2,}\.(.+){2,}';

  private submitResult: SubmitResult = new SubmitResult();

  private model: ChangeEmailModel = new ChangeEmailModel();

  private smsModel: SmsModel = new SmsModel();

  @ViewChild(SmsCodeDialogComponent)
  phoneCode: SmsCodeDialogComponent;

  constructor(
    private userService: User,
    private modalService: ModalService
  ) { }

  ngOnInit() {
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
        (res: any) => {
          this.model.smsId = res.sms;
          this.model.history = res.history;
          this.modalService.hideLoader('email-form');
          this.smsModel.smsId = res.sms;
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
    if (this.smsModel.smsCode === '') {
      return;
    }
    this.modalService.showLoader('email-form');
    this.model.code = +this.smsModel.smsCode;
    this.userService
      .changeUserEmailStep2(
        this.model.smsId,
        this.model.history,
        this.model.code
      )
      .subscribe(
        () => {
          this.submitResult.type = 'success';
          this.submitResult.msg = 'You have to validate you email address. On your email has been sent link.';
          this.modalService.hideLoader('email-form');
          this.submitCompleted.emit(this.submitResult);
          // this.getUser();
          // this.model.password = '';
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
