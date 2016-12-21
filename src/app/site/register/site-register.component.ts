import { Component, ViewEncapsulation } from '@angular/core';
import { OnInit,AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../services/service.user';
import { AppState } from '../../app.service';
import { ModalService } from '../../services/modal.service';

declare const $: any;

@Component({
  selector: 'site-register-component',
  templateUrl: './site-register.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../css/login.css'
  ]
})

export class SiteRegisterComponent implements OnInit, AfterViewInit {

  private telephone: string;

  private errorMsg: string;

  constructor(
    private userService: User,
    private route: ActivatedRoute,
    private router: Router,
    private appState: AppState,
    private modalService: ModalService
  ) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.modalService.setupTelMask();
  }

  register(event) {
    event.preventDefault();
    if (!this.telephone) {
      return;
    }
    if (this.telephone[0] === '+') {
      this.telephone = this.telephone.substring(1);
    }
    this.modalService.showLoader('form')
    this.userService
      .registStep1(this.telephone)
      .subscribe(
        res => {
          this.modalService.hideLoader('form');
          this.appState.set('telephone', res.telephone);
          this.appState.set('sms', res.sms);
          this.router.navigate(['/en/site/confirm']);
          return;
        },
        err => {
          this.modalService.hideLoader('form');
          this.errorMsg = err.json().message;
        }
      )
    ;
  }

}
