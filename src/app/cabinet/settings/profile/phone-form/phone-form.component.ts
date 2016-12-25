import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../../../services/service.user';
import { ModalService } from '../../../../services/modal.service';
import { SmsModel } from '../../../../common/sms-code-dialog/sms.model';
import { AlertComponent } from '../../../../common/alert';
import { SmsCodeDialogComponent } from '../../../../common/sms-code-dialog/sms-code-dialog.component';

declare const $: any;

@Component({
  selector: 'phone-form-component',
  templateUrl: './phone-form.component.html'
})
export class PhoneFormComponent implements OnInit {

  @ViewChild(SmsCodeDialogComponent) phoneCode: SmsCodeDialogComponent;

  @ViewChild(AlertComponent) alert: AlertComponent;

  private smsModel: SmsModel = new SmsModel();

  private history: number;

  private user;

  private phoneForm: FormGroup;

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
    this.phoneForm = this.fb.group({
      oldNumber: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      newNumber: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      password: ['', Validators.required]
    });
  }

  getUser() {
    this.userService
      .getUser()
      .subscribe(
        res => {
          this.user = res;
          this.phoneForm.controls['oldNumber'].setValue(res.telephone);
        }
      )
    ;
  }

  submitForm(event) {
    if (!this.phoneForm.valid) {
      return;
    }
    event.preventDefault();
    this.modalService.showLoader('phone-form');
    this.userService
      .changeUserNumberStep1(
        this.phoneForm.value.password,
        this.phoneForm.value.oldNumber,
        this.phoneForm.value.newNumber
      )
      .subscribe(
        (res: any) => {
          this.history = res.history;
          this.smsModel.smsId = res.sms;
          this.modalService.hideLoader('phone-form');
          this.phoneCode.openCode()
        },
        err => {
          this.modalService.hideLoader('phone-form');
          this.alert.show('danger', err.json().message);
        }
      )
    ;
  }

  closeSmsDialog() {
    if (this.smsModel.smsCode === '') {
      return;
    }
    this.modalService.showLoader('phone-form');
    this.userService
      .changeUserNumberStep2(
        this.smsModel.smsId,
        this.history,
        +this.smsModel.smsCode
      )
      .subscribe(
        () => {
          this.modalService.hideLoader('phone-form');
          this.alert.show('success', 'Telephone updated successfully');
          this.phoneForm.reset();
          this.getUser();
        },
        err => {
          this.modalService.hideLoader('phone-form');
          this.alert.show('danger', err.json().message);
        }
      )
    ;
  }

}
