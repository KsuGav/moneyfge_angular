import { Component, OnInit, ViewChild } from '@angular/core';
import {UserService} from '../../../app.services/User.service';
import {Merchant} from '../../../app.models/Merchant.model';
import {LoaderComponent} from "../../../common-new/loader/loader.component";

declare const $: any;
declare const toastr: any;

@Component({
    selector: 'merchant-panel-component',
    templateUrl: 'merchant-panel.component.html'
})

export class MerchantPanelComponent implements OnInit  {
    merchantInfo: Merchant;

    country: string;
    type: string;
    site_url: string;
    f_name: string;
    l_name: string;
    mail: string;
    telephone: number;
    status_merchant:boolean;

    acceptMerchant;
    getMerchant;
    is_merchant;
    merchant_res;

    getmerchantInfo;

    @ViewChild('loader') loader: LoaderComponent;

    constructor(
        private _userService: UserService) {
    }

    ngOnInit(){
        this.setFlags();
        this.loader.toggle(true);
        this.isMerchant();
        this.getMerchantInfo();
    }

    setFlags(){
        console.log('work');
        $(".select-medium").select2({
            minimumResultsForSearch: Infinity
        });

        function formatTransfer (bill) {
            var $bill = $(
                '<span><img src="/assets/new_assets/img/gerb-fge.png" class="transfer-img" /> ' + bill.text + '</span>'
            );
            return $bill;
        };

        $(".transfer-select.bill").select2({
            templateResult: formatTransfer,
            templateSelection: formatTransfer,
            minimumResultsForSearch: Infinity
        });

        function formatCountry (state) {
            if (!state.id) { return state.text; }
            var $state = $(
                '<span><img src="/assets/new_assets/img/flag-' + state.element.value.toLowerCase() + '.png" class="transfer-img" /> ' + state.text + '</span>'
            );
            return $state;
        };

        $(".transfer-select.country").select2({
            templateResult: formatCountry,
            templateSelection: formatCountry,
            minimumResultsForSearch: Infinity
        }).on('change', function (e) {
            e.ta
        });
    }

    onCountryChange(country){
        this.country = country;
        console.log(country);
    }

    onTypeChange(type){
        this.type = type;
        console.log(type);
    }

    isMerchant(){
        this.is_merchant = this._userService.getIsMerchant()
            .subscribe((res: any) => {
                    this.merchant_res = res;
                    this.status_merchant = this.merchant_res.exists;
                    this.loader.toggle(false);
                },
                err => {
                    toastr.error(err.json().message);
                });
    }

    getMerchantInfo(){
        this.getMerchant = this._userService.getMerchant()
            .subscribe((res: any)=>{
                this.merchantInfo = res;
                    console.log('res', res);
                this.getMerchant.unsubscribe();
            },
                err => {
                    toastr.error(err.json().message);
                    console.log("not find")
                }
            )
    }

    createMerchant(){
        this.acceptMerchant = this._userService.createMerchant(this.country,this.type,this.site_url,this.f_name,this.l_name,this.mail,this.telephone)
            .subscribe(
                (res: any) => {
                    this.merchantInfo = res;
                    toastr.success('New account added successfully');
                    this.acceptMerchant.unsubscribe();
                },
                err => {
                    toastr.error(err.json().message);
                }
            );
    }

    //add form validate for create merchant

}


