import { Injectable } from '@angular/core';

declare const $: any;

@Injectable()
export class ModalService {
  constructor() {}

  showUnderConstruction() {
    $(document).ready(function() {
      const modal = $('.error_modal');

      modal.find('div.modal_close').on('click', function() {
        modal.modal('hide');
      });

      $('.under-construction').on('click', function(event) {
        event.preventDefault();
        modal.modal().show();
      })
    });
  }

  showLoader(selector) {
    $(`#${selector}`).waitMe({
      effect: 'roundBounce',
      text: 'Please waiting...',
      bg: 'rgba(255,255,255,0.85)',
      color: '#000',
      sizeW: '',
      sizeH: '',
      source: '',
      onClose: function() {}

    });
  }

  hideLoader(selector) {
    $(`#${selector}`).waitMe('hide');
  }

  setupTelMask() {
    let input = $('.phone-input-ua');
    var countryData = input.intlTelInput("getSelectedCountryData");
    var isValid = input.intlTelInput("isValidNumber");
    input.intlTelInput({
      utilsScript: "assets/js/intlTelInput/utils.js?5",
      initialCountry: 'auto',
      defaultCountry: 'tr',
      preferredCountries: ['us','ru','tr','ua'],
      autoPlaceholder: false,
      //customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
      //  return selectedCountryPlaceholder;
      //}
      //,
      geoIpLookup: function(callback) {
        $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
          var countryCode = (resp && resp.country) ? resp.country : "";
          callback(countryCode);
        });
      }
    });


    input.focus();
    $(".country").click(function () {
      this_country();
    });

    function this_country() {
      input.val('+' + countryData.dialCode);
      return countryData;
    };

    input.on('keyup change',function(){
      var inputName = input.val();
      var regName = /^([\+0-9-\s]+)$/;
      var true_name = regName.test(inputName);
      if(true_name==false) {
        input.css('box-shadow','0px 0px 4px 0px red')
          .addClass('error');
        console.log("It's not correct number!");

      }else{
        input.css('box-shadow','none').removeClass('error');
      }

    })

    //$('#contactForm').formValidation({
    //  //framework: 'bootstrap',
    //  icon: {
    //    valid: 'glyphicon glyphicon-ok',
    //    invalid: 'glyphicon glyphicon-remove',
    //    validating: 'glyphicon glyphicon-refresh'
    //  },
    //  fields: {
    //    username: {
    //      validators: {
    //        callback: {
    //          message: 'The phone number is not valid',
    //          callback: function(value, validator, $field) {
    //            return value === '' || $field.intlTelInput('isValidNumber');
    //          }
    //        }
    //      }
    //    }
    //  }
    //})
    //// Revalidate the number when changing the country
    //.on('click', '.country-list', function() {
    //  $('#contactForm').formValidation('revalidateField', 'username');
    //});
  }
}
