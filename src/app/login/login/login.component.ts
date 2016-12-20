import { Component, ViewEncapsulation } from '@angular/core';
import { OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoggedInGuard } from '../../services/logged-in.guard';
import { AppState } from '../../app.service';
import { ModalService } from '../../services/modal.service';

declare const $: any;

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: [
    '../css/login.css',
    '../css/intlTelInput.css'
  ]
})

export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  private login: string;

  private password: string;

  private errorMsg: string;

  constructor(
    private loggedInGuard: LoggedInGuard,
    private route: ActivatedRoute,
    private router: Router,
    private appState: AppState,
    private modalService: ModalService
  ) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.setupTelMask();
    this.showHidePassword();
  }

  ngOnDestroy() {
    $('head').children('link#login-style').remove();
  }

  loginIn(event) {
    event.preventDefault();
    this.modalService.showLoader('login-form');
    if (!this.login) {
      return;
    }
    if (this.login[0] === '+') {
      this.login = this.login.substring(1);
    }
    this.loggedInGuard
      .userLoginStep1(this.login, this.password)
      .subscribe(
        (res: any) => {
          if ('sms' in res) {
            this.appState.set('sms', res.sms);
            this.appState.set('username', res.username);
            this.appState.set('password', res.password);

            this.router.navigate(['/en/user/sign-in/confirm']);
            return;
          }
          if ('error' in res) {
            this.errorMsg = res.error;
            this.modalService.hideLoader('login-form');
          }

          sessionStorage.setItem('aToken', res.access_token);
          sessionStorage.setItem('loggedIn', 'true');

          this.router.navigate(['/en/user/cabinet']);
          return;
        },
        (err: any) => {
          this.errorMsg = err.json().message;
          this.modalService.hideLoader('login-form');
        }
      )
    ;
  }

  setupTelMask() {
    let go = 0;
    $('.phone-input-ua').intlTelInput({
      utilsScript: "assets/js/intlTelInput/utils.js?5",
      initialCountry: "auto",
      defaultCountry: 'tr',
      customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
        return selectedCountryPlaceholder;
      },
      geoIpLookup: function (callback) {
        $.get('https://ipinfo.io/json', function() {})
          .always(function (resp) {
            var countryCode = (resp && resp.country) ? resp.country : "";
            go = 1;

            callback(countryCode);
          })
        ;
      }
    });
    $('.phone-input-ua').focus();
    $(".country").click(function () {
      this_country();
    });
    let interval1 = setInterval(function () {
      this_country();
    }, 100);

    function this_country() {
      if (go == 1) {
        var countryData = $(".phone-input-ua").intlTelInput("getSelectedCountryData");
        if (typeof(countryData.dialCode) != 'string') {
          countryData.dialCode = '';
        }
        $('.phone-input-ua').val('+' + countryData.dialCode);

        go = 0;
        return countryData;
      }
    }
  }

  showHidePassword(){
    $('input[type="password"]').each(function (index, input) {
      var $input = $(input);
      $(".input-group .fa-eye").click(function () {
        var change = "";
        if ($(this).hasClass("active")) {
          $(this).removeClass("active");
          change = "password";
        } else {
          $(this).addClass("active");
          change = "text";
        }
        $input.attr('type', change);
      });
    });
  }

}
