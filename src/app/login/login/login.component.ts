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
    //this.setupTelMask();
    this.modalService.setupTelMask();
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

  //setupTelMask() {
  //  let input = $('.phone-input-ua');
  //  var countryData = input.intlTelInput("getSelectedCountryData");
  //  var isValid = input.intlTelInput("isValidNumber");
  //  input.intlTelInput({
  //    utilsScript: "assets/js/intlTelInput/utils.js?5",
  //    initialCountry: 'auto',
  //    defaultCountry: 'tr',
  //    preferredCountries: ['us','ru','tr','ua'],
  //    //customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
  //    //  return selectedCountryPlaceholder;
  //    //}
  //    //,
  //    geoIpLookup: function(callback) {
  //      $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
  //        var countryCode = (resp && resp.country) ? resp.country : "";
  //        callback(countryCode);
  //      });
  //    }
  //  });
  //
  //
  //  input.focus();
  //  $(".country").click(function () {
  //    this_country();
  //  });
  //
  //  function this_country() {
  //    input.val('+' + countryData.dialCode);
  //      return countryData;
  //    };
  //
  //  input.on('keyup change',function(){
  //    var inputName = input.val();
  //    var regName = /^([\+0-9-\s]+)$/;
  //    var true_name = regName.test(inputName);
  //    if(true_name==false) {
  //      input.css('box-shadow','0px 0px 4px 0px red')
  //      .addClass('error');
  //      console.log("It's not correct number!");
  //
  //    }else{
  //      input.css('box-shadow','none').removeClass('error');
  //    }
  //
  //  })
  //
  //  //$('#contactForm').formValidation({
  //  //  //framework: 'bootstrap',
  //  //  icon: {
  //  //    valid: 'glyphicon glyphicon-ok',
  //  //    invalid: 'glyphicon glyphicon-remove',
  //  //    validating: 'glyphicon glyphicon-refresh'
  //  //  },
  //  //  fields: {
  //  //    username: {
  //  //      validators: {
  //  //        callback: {
  //  //          message: 'The phone number is not valid',
  //  //          callback: function(value, validator, $field) {
  //  //            return value === '' || $field.intlTelInput('isValidNumber');
  //  //          }
  //  //        }
  //  //      }
  //  //    }
  //  //  }
  //  //})
  //  //// Revalidate the number when changing the country
  //  //.on('click', '.country-list', function() {
  //  //  $('#contactForm').formValidation('revalidateField', 'username');
  //  //});
  //}

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
