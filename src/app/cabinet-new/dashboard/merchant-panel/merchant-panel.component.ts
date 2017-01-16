import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
    selector: 'merchant-panel-component',
    templateUrl: 'merchant-panel.component.html'
})

export class MerchantPanelComponent implements OnInit  {

    ngOnInit(){
        this.setFlags();
    }

    setFlags(){

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
        });
    }

}


