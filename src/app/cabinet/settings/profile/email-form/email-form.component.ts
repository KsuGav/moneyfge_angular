import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../../../services/service.user';
import { ModalService } from '../../../../services/modal.service';
import { SmsCodeDialogComponent } from '../../../../common/sms-code-dialog';
import { SmsModel } from '../../../../common/sms-code-dialog/sms.model';
import { AlertComponent } from '../../../../common/alert';

declare const $: any;

@Component({
  selector: 'email-form-component',
  templateUrl: 'email-form.component.html'
})
export class EmailFormComponent implements OnInit {

  private user: any;

  private smsModel: SmsModel = new SmsModel();

  @ViewChild(SmsCodeDialogComponent) phoneCode: SmsCodeDialogComponent;

  @ViewChild(AlertComponent) alert: AlertComponent;

  private emailForm: FormGroup;

  private history: number;

  constructor(
    private userService: User,
    private modalService: ModalService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.getUser();
  }

  createForm() {
    const emailValidator = '(.+)@(.+){2,}\.(.+){2,}';
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailValidator)]],
      password: ['', Validators.required]
    });
  }

  getUser() {
    this.userService
      .getUser()
      .subscribe(
        res => {
          this.user = res;
          this.emailForm.controls['email'].setValue(res.email);
        }
      )
    ;
  }

  submitForm() {
    if (!this.emailForm.valid) {
      return;
    }
    this.modalService.showLoader('email-form');
    this.userService
      .changeUserEmailStep1(
        this.emailForm.value.password,
        this.emailForm.value.email
      )
      .subscribe(
        (res: any) => {
          this.smsModel.smsId = res.sms;
          this.history = res.history;
          this.modalService.hideLoader('email-form');
          this.phoneCode.openCode()
        },
        err => {
          this.modalService.hideLoader('email-form');
          this.alert.show('danger', err.json().message);
        }
      )
    ;
  }

  closeSmsDialog() {
    if (this.smsModel.smsCode === '') {
      return;
    }
    this.modalService.showLoader('email-form');
    this.userService
      .changeUserEmailStep2(
        this.smsModel.smsId,
        this.history,
        +this.smsModel.smsCode
      )
      .subscribe(
        () => {
          this.modalService.hideLoader('email-form');
          this.alert.show('success', 'You have to validate you email address. On your email has been sent link.');
          this.emailForm.reset();
          this.getUser();
        },
        err => {
          this.modalService.hideLoader('email-form');
          this.alert.show('danger', err.json().message);
        }
      )
    ;
  }

}
