import {Component, OnInit, ViewChild } from '@angular/core';
import {User} from '../../../../app.models/User.model';
import {UserService} from '../../../../app.services/User.service';
import {LoaderComponent} from "../../../../common-new/loader/loader.component";

declare const $: any;
declare const toastr: any;

@Component({
    selector: 'profile-settings-component',
    templateUrl: 'profile-settings.component.html'
})

export class ProfileSettingsComponent implements OnInit {

    userName: any;
    userInfo: User;

    @ViewChild('smsLoader') smsLoader: LoaderComponent;

    userInfoSubscription;
    toggleSmsSubscription;

    constructor(private _userService: UserService) {
    }

    ngOnInit() {
        this.userInfoSubscription = this._userService.getUserInfo()
            .subscribe((res: any) => {
                    this.userInfo = res;
                },
                err => {
                    toastr.error(err.json().message);
                });

        this.init();
        this.userName = sessionStorage.getItem('telephone');
    }

    ngOnDestroy() {
        this.userInfoSubscription.unsubscribe();
    }

    onSmsClick(state: boolean) {
        if(this.userInfo.is_check_sms == state) {
            return;
        }

        this.smsLoader.toggle(true);
        this.toggleSmsSubscription = this._userService.toggleSmsNotifications()
            .subscribe((res: any) => {
                    this._userService.copyUserInfo(res, this.userInfo);
                    this.smsLoader.toggle(false);
                    this.toggleSmsSubscription.unsubscribe();
                },
                err => {
                    toastr.error(err.json().message);
                });
    }

    init(){
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

        $('#EmailLinkBLockBtn').click(function () {
            if ( !$("#EmailLinkSwitch").is(":checked") ) {
                $('#EmailLinkBLock').slideDown();
            }
        });

        $('#EmailLinkSubmit').click(function () {
            if( $('#EmailLinkInput').val().length >= 5 ) {
                $('#EmailLinkBLock').slideUp();
            }
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
