import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { User } from '../services/service.user';
import { AppState } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login1',
  templateUrl: './login1.component.html',
  styleUrls: [
    './css/login1.component.css'
  ]
})

export class Login1Component implements OnInit, OnDestroy {

  private code: string;

  private username: string;

  private password: string;

  private sms: string;

  private errorMsg: string;

  constructor(
    private userService: User,
    private route: ActivatedRoute,
    private router: Router,
    private appState: AppState
  ) {

  }

  ngOnInit() {
    if (!(sessionStorage.getItem('sms') && sessionStorage.getItem('username') && sessionStorage.getItem('password'))) {
      this.router.navigate(['']);
    } else {
      this.sms = sessionStorage.getItem('sms');
      this.username = sessionStorage.getItem('username');
      this.password = sessionStorage.getItem('password');
    }
  }

  ngOnDestroy() {
    sessionStorage.removeItem('sms');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
  }

  loginIn1() {
    this.userService.userLogin1(this.username, this.password, this.sms, this.code)
      .subscribe(
        (res: any) => {
          this.router.navigate(['/user/profile']);
        },
        (err: any) => {
          this.errorMsg = err.json().message;
        }
      )
    ;
  }

}
