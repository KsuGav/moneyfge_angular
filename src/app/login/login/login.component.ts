import { Component, ViewEncapsulation } from '@angular/core';
import { OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../services/service.user';
import { AppState } from '../../app.service';

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

  private login: string = '380973427717';

  private password: string = '12qwaszx';

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

  ngAfterViewInit() {
    this.setupTelMask();
    this.showHidePassword();
  }

  ngOnDestroy() {
    $('head').children('link#login-style').remove();
  }

  setupTelMask() {
    let go = 0;
    $('.phone-input-ua').intlTelInput({
      utilsScript: "assets/js/intlTelInput/utils.js?5",
      initialCountry: "auto",
      defaultCountry: 'auto',
      customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
        return "e.g. " + selectedCountryPlaceholder;
      },
      geoIpLookup: function (callback) {
        $.get('http://ipinfo.io', function () {
        }, "jsonp").always(function (resp) {
          var countryCode = (resp && resp.country) ? resp.country : "";
          go = 1;

          callback(countryCode);
        });
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
        var rep = $("<input _ngcontent-mrl-13 type='" + change + "' />")
          .attr("id", 'password')
          .attr("name", $input.attr("name"))
          .attr('class', $input.attr('class'))
          .val($input.val())
          .insertBefore($input);
        $input.remove();
        $input = rep;
      }).insertAfter($input);
    });
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
