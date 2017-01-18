import {Component, OnInit } from '@angular/core';

declare const $: any;


@Component({
    selector: 'security-settings-component',
    templateUrl: 'security-settings.component.html'
})

export class SecuritySettingsComponent implements OnInit {

    ngOnInit(){

    }

    emailSubmit() {
        if ($('#EmailLinkInput').val().length >= 5) {
            $('#EmailLinkBLock').slideUp();
        }
    }

    checkboxSmsOn(){
        $('#SMSBLockBtn .on').css({'display':'block'});
        $('#SMSBLockBtn .off').css({'display':'none'});

    }
    checkboxSmsOff(){
        $('#SMSBLockBtn .on').css({'display':'none'});
        $('#SMSBLockBtn .off').css({'display':'block'});
    }

    checkboxEmailOn(){
        $('#EmailLinkBLockBtn .on').css({'display':'block'});
        $('#EmailLinkBLockBtn .off').css({'display':'none'});

    }
    checkboxEmailOff(){
        $('#EmailLinkBLockBtn .on').css({'display':'none'});
        $('#EmailLinkBLockBtn .off').css({'display':'block'});
        $('#EmailLinkBLock').slideDown();
    }


}