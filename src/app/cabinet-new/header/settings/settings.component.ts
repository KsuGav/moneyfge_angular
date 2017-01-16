import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {User} from '../../../app.models/User.model';
import {UserService} from '../../../app.services/User.service';
import {LoaderComponent} from "../../../common-new/loader/loader.component";

declare const $: any;
declare const toastr: any;

@Component({
    selector: 'settings-component',
    templateUrl: 'settings.component.html'
})

export class SettingsComponent implements OnInit, OnDestroy{

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
        this.initSettings();
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

    initSettings(){

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


