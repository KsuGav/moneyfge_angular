import { Component, OnInit, OnDestroy } from '@angular/core';

declare const $: any;

@Component({
    selector: 'payments-component',
    templateUrl: 'payments.component.html'
})

export class PaymentsComponent implements OnInit, OnDestroy {

    ngOnInit(){
        this.activeLink();
        this.unactiveLinks();
    }

    ngOnDestroy(){
        this.unActiveLink();
    }

    activeLink(){
        $('#payments_link').addClass('active')
    }

    unActiveLink(){
        $('#payments_link').removeClass('active')
    }

    unactiveLinks(){
        $('.catalog-categories--item__title a, .popular-services--block__readmore').click(function(){
            return false;
        });
    }
}