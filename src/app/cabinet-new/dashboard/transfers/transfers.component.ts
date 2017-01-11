import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
    selector: 'transfers-component',
    templateUrl: 'transfers.component.html'
})

export class TransfersComponent implements OnInit {

    ngOnInit(){
        this.setSelect()
    }

    setSelect(){
        //Selects
        $("#Phones1").select2();

        $(".select-medium").select2({
            minimumResultsForSearch: Infinity
        });

        function formatTransfer (bill) {
            var $bill = $(
                '<span><img src="/assets/new_assets/img/favicon/favicon1.png" class="transfer-img" /> ' + bill.text + '</span>'
            );
            return $bill;
        };

        $(".transfer-select").select2({
            templateResult: formatTransfer,
            templateSelection: formatTransfer,
            minimumResultsForSearch: Infinity
        });

        $('.equal-height-column').equalHeights();
        $('.equal-expenses').equalHeights();
        $('.account-fill-equal-1').equalHeights();
        $('.account-fill-equal-2').equalHeights();
        $('.account-fill-equal-3').equalHeights();


    }

}
