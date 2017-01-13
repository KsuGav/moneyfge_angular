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
            $('#SMSActive').slideDown();
        });
        $('#SMSDeActivate').click(function () {
            $('#SMSActive').slideUp();
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


