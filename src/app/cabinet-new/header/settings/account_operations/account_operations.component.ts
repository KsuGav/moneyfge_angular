import {Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
    selector: 'account-operations-component',
    templateUrl: 'account_operations.component.html'
})

export class AccountOperationsComponent implements OnInit{

    userName: any;

    ngOnInit() {
        this.selects();
        this.userName = sessionStorage.getItem('telephone');
    }


    selects(){
        $(".select-medium").select2({
            minimumResultsForSearch: Infinity
        });

        function formatTransfer (bill) {
            var $bill = $(
                '<span><img src="/assets/new_assets/img/favicon/favicon1.png" class="transfer-img" /> ' + bill.text + '</span>'
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
        });

        function formatCustom (option) {
            if (!option.id) { return option.text; }
            var $option = $(
                '<span><img src="/assets/new_assets/img/' + option.element.value.toLowerCase() + '.png" class="transfer-img" /> ' + option.text + '</span>'
            );
            return $option;
        };

        $(".transfer-select.custom").select2({
            templateResult: formatCustom,
            templateSelection: formatCustom,
            minimumResultsForSearch: Infinity
        });
    }
}