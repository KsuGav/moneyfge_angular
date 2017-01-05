import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../services/service.user';
import { LoggedInGuard } from '../../services/logged-in.guard';
import { n_AccountService } from '../../app.services/Account.service';
import { AppState } from '../../app.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'site-password-component',
  templateUrl: './site-password.component.html',
  styleUrls: [
    '../css/login.css'
  ]
})

export class SitePasswordComponent implements OnInit {

  private password: string;

  private errorMsg: string;

  constructor(
    private userService: User,
    private guardService: LoggedInGuard,
    private accountService: n_AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private appState: AppState,
    private modalService: ModalService
  ) {

  }

  ngOnInit() {

  }

  register(event) {
    event.preventDefault();
    this.modalService.showLoader('block');
    this.userService
      .registStep3(this.password, this.appState.get('telephone'))
      .subscribe(
        () => {
          this.appState.set('sms', null);
          const telephone = this.appState.get('telephone');
          this.guardService
            .userLoginStep1(telephone, this.password)
            .subscribe(
              (res: any) => {
                sessionStorage.setItem('aToken', res.access_token);
                sessionStorage.setItem('loggedIn', 'true');
                this.accountService
                  .createCard('USD')
                  .subscribe(
                    () => {
                      this.appState.set('telephone', null);
                      this.router.navigate(['/user/dashboard']);
                      return;
                    },
                    err => {
                      this.errorMsg = err.json().message;
                      this.modalService.hideLoader('block');
                    }
                  )
                ;
              },
              err => {
                this.errorMsg = err.json().message;
                this.modalService.hideLoader('block');
              }
            )
          ;
        },
        err => {
          this.errorMsg = err.json().message;
          this.modalService.hideLoader('block');
        }
      )
    ;
  }

}
