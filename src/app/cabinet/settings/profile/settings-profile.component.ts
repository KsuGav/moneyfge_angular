import { Component } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../../services/modal.service';
import { User } from '../../../services/service.user';
import { SubmitResult } from './SubmitResult';

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

  private msgType: string = '';

  private isAlertOpen: boolean = false;

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
    this.isAlertOpen = false;
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
          this.isAlertOpen = true;
        },
        (err: any) => {
          event.target.checked = this.isCheckSms;
          this.msgType = 'danger';
          this.msg = err.json().message;
          this.modalService.hideLoader('block');
          this.isAlertOpen = true;
        }
      )
    ;
  }

  phoneUpdateCompleted(data: SubmitResult) {
    this.msgType = data.type;
    this.msg = data.msg;
    this.isAlertOpen = true;
  }

  emailUpdateCompleted(data: SubmitResult) {
    this.msgType = data.type;
    this.msg = data.msg;
    this.isAlertOpen = true;
  }

}
