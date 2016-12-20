import { Component } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../../services/modal.service';
import { User } from '../../../services/service.user';
import { ChangePhoneModel } from './ChangePhoneModel';

declare const $: any;

@Component({
  selector: 'settings-profile-component',
  templateUrl: './settings-profile.component.html'
})
export class SettingsProfileComponent implements OnInit, AfterViewInit, OnDestroy {

  private user;

  private email: string;

  private phone: string;

  private sms: boolean;

  private isCheckSms: boolean;

  private msg: string;

  private msgType: string;

  private code: string;

  private smsDialog;

  private isHiddenAlert: boolean = true;

  private phoneModel = new ChangePhoneModel();

  constructor(
    public router: Router,
    private modalService: ModalService,
    private userService: User
  ) {

  }

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip();
    this.smsDialog = $('sms-dialog');
    this.modalService.showLoader('block');
    this.userService
      .getUser()
      .subscribe(
        (res: any) => {
          this.user = res;
          this.phoneModel.oldNumber = res.telephone;
          this.isCheckSms = res.is_check_sms;
          this.email = res.email;
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

  phoneSubmitStep1(event) {
    event.preventDefault();
    // this.modalService.showLoader('phone-form');
    // this.userService
    //   .changeUserNumberStep1(
    //     this.phoneModel.password,
    //     this.phoneModel.oldNumber,
    //     this.phoneModel.newNumber
    //   )
    //   .subscribe(
    //     res => {
    //       this.phoneModel.smsId = res.sms;
    //       this.phoneModel.history = res.history;
    //       this.modalService.hideLoader('phone-form');
    //       this.smsDialog.open();
    //     },
    //     err => {
    //       this.msgType = 'danger';
    //       this.msg = err.json().message;
    //       this.modalService.hideLoader('phone-form');
    //     }
    //   )
    // ;
  }

  sendCode() {

  }

}
