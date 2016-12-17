import { Component, ViewEncapsulation } from '@angular/core';
import { OnInit,AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../services/service.user';
import { AppState } from '../../app.service';

declare const $: any;

@Component({
  selector: 'site-register-component',
  templateUrl: './site-register.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../css/login.css'
  ]
})

export class SiteRegisterComponent implements OnInit, AfterViewInit {

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
  }

  setupTelMask() {
    let go = 0;
    $('.phone-input-ua').intlTelInput({
      utilsScript: "assets/js/intlTelInput/utils.js?5",
      initialCountry: "auto",
      defaultCountry: 'auto',
      customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
        return selectedCountryPlaceholder;
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

}
