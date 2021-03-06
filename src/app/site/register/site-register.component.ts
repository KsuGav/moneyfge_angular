import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../services/service.user';
import { AppState } from '../../app.service';
import { ModalService } from '../../services/modal.service';
import { DialogComponent } from '../../common-new/dialog/dialog.component';

declare const $: any;

@Component({
  selector: 'site-register-component',
  templateUrl: './site-register.component.html',
  styleUrls: [
    '../css/login.css'
  ]
})

export class SiteRegisterComponent implements OnInit, AfterViewInit {

  @ViewChild('termsDialog') termsDialog: DialogComponent;

  @ViewChild('terms') terms: ElementRef;

  telephone: string;

  errorMsg: string;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: User,
    private router: Router,
    private appState: AppState,
    private modalService: ModalService
  ) {
    this.createForm();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.modalService.setupTelMask();

    $('.open-popup-link').magnificPopup({
      type:'inline',
      midClick: true,
      closeMarkup: '<button title="%title%" type="button" class="mfp-close big">&#215;</button>'
    });

    $('.close-popup').click(function(event){
      event.preventDefault();
      $.magnificPopup.close();
    });

    $('.popup-content-scroll').mCustomScrollbar({
      theme: 'minimal-dark',
      autoHideScrollbar: false,
      mouseWheel:
        {
          scrollAmount: 150
        }
    });
  }

  createForm() {
    this.form = this.fb.group({
      telephone: ['', [Validators.required, Validators.pattern('[+|0-9]+')]]
    });
  }

  register() {
    if (!this.form.valid) {
      this.errorMsg = 'Form is invalid';
      return;
    }
    if (!this.terms.nativeElement.checked) {
      this.errorMsg = 'Please, accept terms';
      return;
    }
    let telephone = this.form.value.telephone;
    if (telephone[0] === '+') {
      telephone = telephone.substring(1);
    }
    this.modalService.showLoader('form');
    this.userService
      .registStep1(telephone)
      .subscribe(
        res => {
          this.modalService.hideLoader('form');
          this.appState.set('telephone', res.telephone);
          this.appState.set('sms', res.sms);
          this.router.navigate(['/site/confirm']);
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
