import { Component } from '@angular/core';
import { OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../services/service.user';
import { AppState } from '../../app.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'site-confirm-component',
  templateUrl: './site-confirm.component.html',
  styleUrls: [
    '../css/login.css'
  ]
})

export class SiteConfirmComponent implements OnInit, OnDestroy, AfterViewInit {

  private code: string;

  private errorMsg: string;

  private secs: number = 0;

  private interval;

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

  ngAfterViewInit () {

  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  resendSms(event) {
    event.preventDefault();
    if (!this.appState.get('sms')) {
      return;
    }
    if (this.secs > 0) {
      return;
    }
    this.modalService.showLoader('form');
    this.secs = 1;
    this.interval = setInterval(() => {
      if (this.secs === 60) {
        clearInterval(this.interval);
        this.secs = 0;
        return;
      }
      this.secs += 1;
    }, 1000);
    this.userService
      .sendSms(this.appState.get('sms'))
      .subscribe(
        res => {
          this.appState.set('sms', res.sms);

        },
        err => {
          this.modalService.hideLoader('form');
          this.errorMsg = err.json().message;
        }
      )
    ;
  }

  register(event) {
    event.preventDefault();
    this.userService
      .registStep2(this.code, this.appState.get('telephone'))
      .subscribe(
        res => {
          this.router.navigate(['/site/password']);
          return;
        },
        err => this.errorMsg = err.json().message
      )
    ;
  }

}
