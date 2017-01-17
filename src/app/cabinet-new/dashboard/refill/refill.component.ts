import { Component, OnInit, OnDestroy } from '@angular/core';

declare const $: any;

@Component({
    selector: 'refill-component',
    templateUrl: 'refill.component.html'
})

export class RefillComponent implements OnInit, OnDestroy {

    ngOnInit(){
        this.activeLink();
        this.formatcards();
    }

    ngOnDestroy(){
        this.unActiveLink();
    }

    activeLink(){
        $('#refill_link').addClass('active')
    }

    unActiveLink(){
        $('#refill_link').removeClass('active')
    }

    formatcards(){
        $(".select-medium").select2({
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
    }
}

