import { Component, ViewEncapsulation } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../../services/modal.service';
import { User } from '../../../services/service.user';

declare const $: any;

@Component({
  selector: 'settings-password-component',
  templateUrl: './settings-password.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: []
})
export class SettingsPasswordComponent implements OnInit, AfterViewInit, OnDestroy {

  private oldPass: string;

  private newPass: string;

  private againPass: string;

  private msg: string;

  constructor(
    public router: Router,
    private modalService: ModalService,
    private userService: User
  ) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.modalService.showUnderConstruction();
  }

  ngOnDestroy () {

  }

  submitForm(event) {
    event.preventDefault();
    if (this.newPass !== this.againPass) {
      alert('New passwords is not equal');
      return;
    }
    this.modalService.showLoader('form');
    this.userService
      .changePassword(this.oldPass, this.newPass, this.againPass)
      .subscribe(
        res => {
          this.modalService.hideLoader('form');
        },
        err => {
          this.modalService.hideLoader('form');
        }
      )
    ;
  }
//KQ=jcH<(Jy
}
