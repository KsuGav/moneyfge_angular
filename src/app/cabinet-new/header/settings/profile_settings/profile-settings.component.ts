import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {User} from '../../../../app.models/User.model';
import {UserService} from '../../../../app.services/User.service';
import {LoaderComponent} from "../../../../common-new/loader/loader.component";
import {SmsDialogComponent} from "../../../../common-new/sms-dialog/sms-dialog.component";
import {SmsCode} from "../../../../app.models/SmsCode.model";

declare const $: any;
declare const toastr: any;

@Component({
    selector: 'profile-settings-component',
    templateUrl: 'profile-settings.component.html'
})

export class ProfileSettingsComponent implements OnInit, OnDestroy{
    userInfo: User;

    newNumber: string;
    userEmail: string = '';
    newPassword: string;
    newPassword2: string;
    smsCode: string;
    passwordForChange: string;
    smsModel: SmsCode;
    smsHistory: number;
    passwordValid: boolean = false;

    changingParam = '';

    @ViewChild('smsLoader') smsLoader: LoaderComponent;
    @ViewChild('settingLoader') settingLoader: LoaderComponent;
    @ViewChild('numberLoader') numberLoader: LoaderComponent;
    @ViewChild('smsDialog') smsDialog: SmsDialogComponent;

    userInfoSubscription;
    toggleSmsSubscription;
    numberStep1Subscription;
    numberStep2Subscription;
    emailStep1Subscription;
    passwordChnageSubscription;

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
                    this.userEmail = this.userInfo.email;
                    if(this.userInfo.email == this.userInfo.telephone || !this.userInfo.email.includes('@')) {
                        this.userEmail = '';
                    }
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

    static validateEmail(email) {
        console.log(email);
        return email;
    }

    onNumberSaveClick() {
        this.numberLoader.toggle(true);
        this.changingParam = 'number';
        this.numberStep1Subscription = this._userService.changeNumberStep1(this.userInfo.telephone, this.newNumber, this.passwordForChange)
            .subscribe(
                (res: any) => {
                    this.numberStep1Subscription.unsubscribe();
                    this.numberLoader.toggle(false);
                    this.smsHistory = res.history;
                    this.smsDialog.open(res.sms);
                },
                err => {
                    this.numberStep1Subscription.unsubscribe();
                    this.numberLoader.toggle(false);
                    toastr.error(err.json().message);
                }
            );
        this.numberLoader.toggle(true);
        this.afterStep2();

    }

    onEmailAcceptClick() {
        if(ProfileSettingsComponent.validateEmail(this.userEmail)) {
            $('#EmailStep2Block').slideDown();
        } else {
            // !todo: show some error
        }
    }

    onEmailSaveClick() {
        this.numberLoader.toggle(true);
        this.changingParam = 'email';
        this.emailStep1Subscription = this._userService.changeEmailStep1(this.userEmail, this.passwordForChange)
            .subscribe(
                (res: any) => {
                    this.emailStep1Subscription.unsubscribe();
                    this.numberLoader.toggle(false);
                    this.smsHistory = res.history;
                    this.smsDialog.open(res.sms);
                },
                err => {
                    this.emailStep1Subscription.unsubscribe();
                    this.numberLoader.toggle(false);
                    toastr.error(err.json().message);
                }
            );
        this.afterStep2();
    }

    changeStep2(code: SmsCode) {
        this.smsModel = code;
        this.numberLoader.toggle(true);
        this.numberStep2Subscription =
            this._userService.changeStep2(this.smsModel.smsId, this.smsHistory, this.smsModel.smsCode, this.changingParam)
                .subscribe(
                    (res: any) => {
                        this._userService.copyUserInfo(res, this.userInfo);
                        this.numberStep2Subscription.unsubscribe();
                        this.numberLoader.toggle(false);
                        sessionStorage.setItem('telephone', this.userInfo.telephone);
                        toastr.success(`The ${this.changingParam} was successfully changed`);
                        this.ngOnInit();
                        this.afterStep2();
                    },

                    err => {
                        this.numberStep2Subscription.unsubscribe();
                        this.numberLoader.toggle(false);
                        toastr.error(err.json().message);
                    }
                )
    }

    afterStep2() {
        this.newNumber = '';
        this.passwordForChange = '';
        this.userEmail = '';
        // !todo: slideup all fields
        // show all changed items
        // clear all fields - done
    }

    onNewPasswordChange() {
        let re = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).{7,}$/;
        this.passwordValid = (re.test(this.newPassword) && re.test(this.newPassword2));
    }

    onPasswordChangeClick() {
        this.onNewPasswordChange();
        if (!this.passwordValid) {
            $('#msgErrorPas').css({'display':'block'});
            return;
        }
        if(this.newPassword != this.newPassword2) {
            toastr.error('Password confirmarion doesn\'t match the password');
            return;
        }
        this.passwordChnageSubscription = this._userService.changePassword(this.passwordForChange, this.newPassword)
            .subscribe(
                () => {
                    this.passwordChnageSubscription.unsubscribe();
                    toastr.success(`The password was successfully changed`);
                    this.afterStep2();
                },
                err => {
                    toastr.error(err.json().message);
                });
        $('#msgErrorPas').css({'display':'none'});
        this.afterStep2();
    }
}