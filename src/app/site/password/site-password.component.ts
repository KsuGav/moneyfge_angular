import { Component, ViewEncapsulation } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../services/service.user';
import { AppState } from '../../app.service';

@Component({
  selector: 'site-password-component',
  templateUrl: './site-password.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../css/login.css'
  ]
})

export class SitePasswordComponent implements OnInit {

  private password: string;

  private errorMsg: string;

  constructor(
    private userService: User,
    private route: ActivatedRoute,
    private router: Router,
    private appState: AppState
  ) {

  }

  ngOnInit() {

  }

  register(event) {
    event.preventDefault();
    this.userService
      .registStep3(this.password, this.appState.get('telephone'))
      .subscribe(
        res => {
          this.appState.set('telephone', null);
          this.router.navigate(['/en/user/sign-in/login']);
          return;
        },
        err => this.errorMsg = err.json().message
      )
    ;
  }

}
