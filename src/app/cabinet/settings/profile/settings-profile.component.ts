import { Component, ViewEncapsulation } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../../services/modal.service';
import { User } from '../../../services/service.user';

declare const $: any;

@Component({
  selector: 'settings-profile-component',
  templateUrl: './settings-profile.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: []
})
export class SettingsProfileComponent implements OnInit, AfterViewInit, OnDestroy {

  private user;

  private email: string;

  private phone: string;

  private sms: boolean;

  private msg: string;

  private msgType: string;

  constructor(
    public router: Router,
    private modalService: ModalService,
    private userService: User
  ) {

  }

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip();
    this.userService
      .getUser()
      .subscribe(
        res => {
          this.user = res;
          this.email = res.email;
          this.phone = res.telephone;
        }
      )
    ;
  }

  ngAfterViewInit() {
    this.modalService.showUnderConstruction();
  }

  ngOnDestroy () {

  }

}
