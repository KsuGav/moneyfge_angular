import { Component, ViewEncapsulation } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../services/service.user';
import { AppState } from '../../app.service';
import { LoggedInGuard } from '../../services/logged-in.guard';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'login-confirm-component',
  templateUrl: './login-confirm.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../css/login.css'
  ]
})

export class LoginConfirmComponent implements OnInit, OnDestroy {

  private code: string;

  private errorMsg: string;

  private secs: number = 0;

  private interval;

  constructor(
    private loggedInGuard: LoggedInGuard,
    private userService: User,
    private route: ActivatedRoute,
    private router: Router,
    private appState: AppState,
    private modalService: ModalService
  ) {

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  resendSms(event) {
    event.preventDefault();
    if (this.secs > 0 && this.secs < 60) {
      return;
    }
    this.secs = 60;
    this.interval = setInterval(() => {
      if (this.secs === 0) {
        clearInterval(this.interval);
        this.secs = 60;
        return;
      }
      this.secs -= 1;
    }, 1000);
    this.userService
      .sendSms(this.appState.get('sms'))
      .subscribe(
        res => this.appState.set('sms', res.sms),
        err => this.errorMsg = err.json().message
      )
    ;
  }

  loginIn(event) {
    event.preventDefault();
    this.modalService.showLoader('form');
    this.loggedInGuard
      .userLoginStep2(
        this.appState.get('username'),
        this.appState.get('password'),
        this.appState.get('sms'),
        this.code
      )
      .subscribe(
        (res: any) => {
          if ('error' in res) {
            this.errorMsg = res.message;
            this.modalService.hideLoader('form');
            return;
          }

          sessionStorage.setItem('aToken', res.access_token);
          sessionStorage.setItem('loggedIn', 'true');

          this.router.navigate(['/en/user/cabinet']);
        },
        err => {
          this.errorMsg = err.json().message;
          this.modalService.hideLoader('form');
        }
      )
    ;
  }

}
