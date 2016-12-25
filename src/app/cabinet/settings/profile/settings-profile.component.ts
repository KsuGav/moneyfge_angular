import { Component,ViewChild  } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../../services/modal.service';
import { User } from '../../../services/service.user';

declare const $: any;

@Component({
  selector: 'settings-profile-component',
  templateUrl: './settings-profile.component.html'
})
export class SettingsProfileComponent implements OnInit, AfterViewInit, OnDestroy {

  private user;

  private isCheckSms: boolean;

  private msg: string;

  private msgType: string = '';

  private isAlert: boolean = false;

  constructor(
    public router: Router,
    private modalService: ModalService,
    private userService: User

  ) { }

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip();
    this.getUser();
  }

  getUser() {
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
    this.isAlert = false;
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
          this.isAlert = true;
        },
        (err: any) => {
          event.target.checked = this.isCheckSms;
          this.msgType = 'danger';
          this.msg = err.json().message;
          this.modalService.hideLoader('block');
          this.isAlert = true;
        }
      )
    ;
  }

}
