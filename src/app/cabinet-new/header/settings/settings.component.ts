import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {User} from '../../../app.models/User.model';
import {UserService} from '../../../app.services/User.service';
import {LoaderComponent} from "../../../common-new/loader/loader.component";
import {AccountOperationsComponent} from "./account_operations/account_operations.component";
import {ProfileSettingsComponent} from "./profile_settings/profile-settings.component";
import {SecuritySettingsComponent} from "./security_settings/security-settings.component";

declare const $: any;
declare const toastr: any;

@Component({
    selector: 'settings-component',
    templateUrl: './settings.component.html'
})

export class SettingsComponent implements OnInit, OnDestroy{

    // userName: any;
    userInfo: User;

    @ViewChild('smsLoader') smsLoader: LoaderComponent;
    @ViewChild('settingLoader') settingLoader: LoaderComponent;
    @ViewChild('accountOperations') accountOperations: AccountOperationsComponent;
    @ViewChild('profileSettings') profileSettings: ProfileSettingsComponent;
    @ViewChild('securitySettings') securitySettings: SecuritySettingsComponent;

    userInfoSubscription;
    toggleSmsSubscription;

    constructor(private _userService: UserService) {
    }

    ngOnInit() {
        this.initSettings();
        // this.userName = sessionStorage.getItem('telephone');
    }

    ngOnDestroy() {
        // this.userInfoSubscription.unsubscribe();
    }


    initSettings(){


        $('#SettingsMenuTabs li').click(function(){
            var tab_id = $(this).attr('data-tab');

            $('#SettingsMenuTabs li').removeClass('active');
            $(this).addClass('active');

            $('.settings-tab.active').fadeOut();
            $('.settings-tab.active').removeClass('active');
            $('#'+tab_id).delay(100).fadeIn();
            $('#'+tab_id).addClass('active');

        });


    }

}


