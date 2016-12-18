import { Component, ViewEncapsulation } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../services/service.user';
import { AppState } from '../../app.service';

@Component({
  selector: 'site-confirm-component',
  templateUrl: './site-confirm.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../css/login.css'
  ]
})

export class SiteConfirmComponent implements OnInit {

  private code: string;

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
      .registStep2(this.code, this.appState.get('telephone'))
      .subscribe(
        res => {
          this.router.navigate(['/en/site/password']);
          return;
        },
        err => this.errorMsg = err.json().message
      )
    ;
  }

}
