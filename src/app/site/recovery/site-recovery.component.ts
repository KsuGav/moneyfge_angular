import { Component, ViewEncapsulation } from '@angular/core';
import { OnInit,AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../services/service.user';
import { AppState } from '../../app.service';
import { ModalService } from '../../services/modal.service';

declare const $: any;

@Component({
  selector: 'site-recovery-component',
  templateUrl: './site-recovery.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../css/login.css'
  ]
})

export class SiteRecoveryComponent implements OnInit,AfterViewInit {

  private errorMsg: string;

  private phone: string;

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

  submitForm(event) {
    event.preventDefault();
    this.modalService.showLoader('recovery-form');
    if (!this.phone) {
      return;
    }
    if (this.phone[0] === '+') {
      this.phone = this.phone.substring(1);
    }
    this.userService
      .ressetPassword(this.phone)
      .subscribe(
        res => {
          this.modalService.hideLoader('recovery-form');
          this.router.navigate(['/en/user/sign-in/login']);
        },
        err => {
          this.errorMsg = err.json().message;
          this.modalService.hideLoader('recovery-form');
        }
      )
    ;
  }


}
