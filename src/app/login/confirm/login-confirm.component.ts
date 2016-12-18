import { Component, ViewEncapsulation } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../services/service.user';
import { AppState } from '../../app.service';
import { LoggedInGuard } from '../../services/logged-in.guard';

@Component({
  selector: 'login-confirm-component',
  templateUrl: './login-confirm.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../css/login.css'
  ]
})

export class LoginConfirmComponent implements OnInit {

  private code: string;

  private errorMsg: string;

  constructor(
    private loggedInGuard: LoggedInGuard,
    private userService: User,
    private route: ActivatedRoute,
    private router: Router,
    private appState: AppState
  ) {

  }

  ngOnInit() {

  }

  loginIn(event) {
    console.log(this.appState);
    event.preventDefault();
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
          }

          sessionStorage.setItem('aToken', res.access_token);
          sessionStorage.setItem('loggedIn', 'true');

          this.router.navigate(['/en/user/cabinet']);
        },
        err => this.errorMsg = err.json().message
      )
    ;
  }

}
