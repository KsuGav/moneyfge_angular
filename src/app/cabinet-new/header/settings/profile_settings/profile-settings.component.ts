import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {User} from '../../../../app.models/User.model';
import {UserService} from '../../../../app.services/User.service';
import {LoaderComponent} from "../../../../common-new/loader/loader.component";
import {SmsDialogComponent} from "../../../../common-new/sms-dialog/sms-dialog.component";
import {SmsCode} from "../../../../app.models/SmsCode.model";

declare const $: any;
declare const toastr: any;

@Component({
    selector: 'settings-component',
    templateUrl: 'settings.component.html'
})

export class ProfileSettingsComponent implements OnInit, OnDestroy{
    userInfo: User;

    newNumber: string;
    smsCode: string;
    passwordForNumberChange: string;
    smsModel: SmsCode;
    smsHistory: number;

    @ViewChild('smsLoader') smsLoader: LoaderComponent;
    @ViewChild('settingLoader') settingLoader: LoaderComponent;
    @ViewChild('numberLoader') numberLoader: LoaderComponent;
    @ViewChild('smsDialog') smsDialog: SmsDialogComponent;

    userInfoSubscription;
    toggleSmsSubscription;
    numberStep1Subscription;
    numberStep2Subscription;

    constructor(private _userService: UserService) {
    }

    initSettings(){

        $('.container').on('click', '#WalletStep1', function () {
            $('#WalletStep1Block').slideDown();
        });

        $('.container').on('blur', '.input-sms', function()
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

    ngOnInit() {
        this.userInfoSubscription = this._userService.getUserInfo()
            .subscribe((res: any) => {
                    this.userInfo = res;
                },
                err => {
                    toastr.error(err.json().message);
                });

        this.initSettings();
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
            .subscribe(
                (res: any) => {
                    this._userService.copyUserInfo(res, this.userInfo);
                    this.smsLoader.toggle(false);
                    this.toggleSmsSubscription.unsubscribe();
                },
                err => {
                    toastr.error(err.json().message);
                });
    }

    onNumberAcceptClick() {
        if(ProfileSettingsComponent.validateNumber(this.newNumber)) {
            $('#WalletStep2Block').slideDown();
        } else {
            // !todo: show some error
        }
    }

    static validateNumber(number) {
        console.log(number);
        return true;
    }

    onNumberSaveClick() {
        this.numberLoader.toggle(true);
        this.numberStep1Subscription = this._userService.changeNumberStep1(this.userInfo.telephone, this.newNumber, this.passwordForNumberChange)
            .subscribe(
                (res: any) => {
                    this.numberLoader.toggle(false);
                    this.smsHistory = res.history;
                    this.smsDialog.open(res.sms);
                },
                err => {
                    this.numberLoader.toggle(false);
                    toastr.error(err.json().message);
                }
            );
        this.numberLoader.toggle(true);
    }

    changeNumberStep2(code: SmsCode) {
        this.smsModel = code;
        this.numberLoader.toggle(true);
        this.numberStep1Subscription.unsubscribe();
        this.numberStep2Subscription =
            this._userService.changeNumberStep2(this.smsModel.smsId, this.smsHistory, this.smsModel.smsCode)
                .subscribe(
                    (res: any) => {
                        this._userService.copyUserInfo(res, this.userInfo);
                        this.numberStep2Subscription.unsubscribe();
                        this.numberLoader.toggle(false);
                        sessionStorage.setItem('telephone', this.userInfo.telephone);
                        toastr.success("The number was successfully changed");
                        this.ngOnInit();
                    },

                    err => {
                        this.numberStep2Subscription.unsubscribe();
                        this.numberLoader.toggle(false);
                        toastr.error(err.json().message);
                    }
                )
    }
}