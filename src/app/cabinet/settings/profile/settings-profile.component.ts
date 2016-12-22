import { Component,ViewChild  } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../../services/modal.service';
import { User } from '../../../services/service.user';
import { SubmitResult } from './SubmitResult';

import { SmsCodeDialogComponent } from '../../../common/sms-code-dialog/sms-code-dialog.component'

declare const $: any;

@Component({
  selector: 'settings-profile-component',
  templateUrl: './settings-profile.component.html'
})
export class SettingsProfileComponent implements OnInit, AfterViewInit, OnDestroy {

  private user;

  private email: string;

  private isCheckSms: boolean;

  private msg: string;

  private msgType: string;

  private isHiddenAlert: boolean = true;

  @ViewChild(SmsCodeDialogComponent) phoneCode: SmsCodeDialogComponent;

  constructor(
    public router: Router,
    private modalService: ModalService,
    private userService: User

  ) {

  }

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip();
    this.modalService.showLoader('block');
    this.userService
      .getUser()
      .subscribe(
        (res: any) => {
          this.user = res;
          this.isCheckSms = res.is_check_sms;
          this.modalService.hideLoader('block');
        }
      )
    ;
  }

  ngAfterViewInit() {
    this.modalService.showUnderConstruction();
  }

  ngOnDestroy () {

  }

  closeAlert() {
    this.isHiddenAlert = true;
  }

  isCheckSmsChange(event) {
    event.preventDefault();
    this.modalService.showLoader('block');
    this.userService
      .isCheckSms()
      .subscribe(
        (res: any) => {
          this.isCheckSms = res.is_check_sms;
          event.target.checked = this.isCheckSms;
          this.msgType = 'success';
          this.msg = 'Changes saved successfully';
          this.modalService.hideLoader('block');
          this.isHiddenAlert = false;
        },
        (err: any) => {
          event.target.checked = this.isCheckSms;
          this.msgType = 'danger';
          this.msg = err.json().message;
          this.modalService.hideLoader('block');
          this.isHiddenAlert = false;
        }
      )
    ;
  }

  phoneUpdateCompleted(data: SubmitResult) {
    this.msgType = data.type;
    this.msg = data.msg;
    this.isHiddenAlert = false;
  }

  emailUpdateCompleted(data: SubmitResult) {
    this.msgType = data.type;
    this.msg = data.msg;
    this.isHiddenAlert = false;
  }

  openCode(){
    this.phoneCode.openCode()
  }

  showCode(event){
    console.log(event);
  }
}
