import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
    selector: 'settings-component',
    templateUrl: 'settings.component.html'
})

export class SettingsComponent implements OnInit {

    userName: any;

    ngOnInit(){
        this.settings();
        this.userName = sessionStorage.getItem('telephone');
    }

    settings(){
        // Settings Page Functions
        $('#SMSActivate').click(function () {
            $(this).toggleClass('btn-accent').toggleClass('btn-grey').attr('disabled', true);
            $(this).parent().prev().children().toggleClass('active');
            $('#SMSDeActivate').toggleClass('btn-grey').toggleClass('btn-accent').attr('disabled', false);
            $('#SMSDeActivate').parent().prev().children().toggleClass('active');
        });
        $('#SMSDeActivate').click(function () {
            $(this).toggleClass('btn-accent').toggleClass('btn-grey').attr('disabled', true);
            $(this).parent().prev().children().toggleClass('active');
            $('#SMSActivate').toggleClass('btn-grey').toggleClass('btn-accent').attr('disabled', false);
            $('#SMSActivate').parent().prev().children().toggleClass('active');
        });

        $('#WalletStep1').click(function () {
            $('#WalletStep1Block').slideDown();
        });

        $('#WalletStep3').click(function () {
            $('#WalletStep1Block, #WalletStep2Block').slideUp();
            $('.wallet-block.success').fadeIn();
        });

        $('.input-sms').blur(function()
        {
            if($(this).val().length <= 3) {
                $('#SmsCheck').removeClass('yes');
                $('#SmsCheck').addClass('no');
                $('#WalletStep2').click(function () {
                    $('#SmsCheck').removeClass('yes');
                    $('.sms-check').addClass('no');
                });
            } else {
                $('#SmsCheck').removeClass('no');
                $('#SmsCheck').addClass('yes');
                $('#WalletStep2').click(function () {
                    $('#SmsCheck').removeClass('no');
                    $('.sms-check').addClass('yes');
                    $('#WalletStep2Block').slideDown();
                });
            }
        });
    }


}


