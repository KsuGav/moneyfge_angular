import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
    selector: 'settings-component',
    templateUrl: 'settings.component.html'
})

export class SettingsComponent implements OnInit {

    ngOnInit(){
        this.settings();
    }

    settings(){
        // Settings Page Functions
        $('#SMSActivate').click(function () {
            if($(this).hasClass('btn-accent')){
                $(this).removeClass('btn-accent').addClass('btn-grey').text('Disabled');
                $('.setting-indicator').addClass('active').text('The service is activate');
            } else{
                $(this).removeClass('btn-grey').addClass('btn-accent').text('Activate');
                $('.setting-indicator').removeClass('active').text('The service is disabled');
            }
        });
        $('#WalletStep1').click(function () {
            $('#WalletStep1Block').slideDown();
        });
        $('#WalletStep2').click(function () {
            $('#WalletStep2Block').slideDown();
        });
        $('#WalletStep3').click(function () {
            $('#WalletStep1Block, #WalletStep2Block').slideUp();
            $('.wallet-block.success').fadeIn();
        });
    }


}


