import { Component, ViewEncapsulation } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../services/service.user';
import { AppState } from '../../app.service';

declare const $: any;

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {

  private login: string = '380973427717';

  private password: string = '12qwaszx';

  private errorMsg: string;

  constructor(
    private userService: User,
    private route: ActivatedRoute,
    private router: Router,
    private appState: AppState
  ) {
    $('head').append('<link id="login-style" rel="stylesheet" href="assets/css/login.css" type="text/css" />');
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    $('head').children('link#login-style').remove();
  }

  resetPassword() {
    this.router.navigate(['en/site/reset-password']);
  }

  loginIn() {
    this.userService.userLogin(this.login, this.password)
      .subscribe(
        (res: any) => {
          if ('sms' in res) {
            sessionStorage.setItem('sms', res.sms);
            sessionStorage.setItem('username', res.username);
            sessionStorage.setItem('password', res.password);

            this.router.navigate(['user/login1']);
            return;
          }
          if ('error' in res) {
            this.errorMsg = res.error;
          }
          this.router.navigate(['user/profile']);
        },
        (err: any) => {
          this.errorMsg = err.json().message;
        }
      )
    ;
  }

}
