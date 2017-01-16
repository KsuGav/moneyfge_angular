import { Component, OnInit, OnDestroy } from '@angular/core';

declare const $: any;

@Component({
    selector: 'cashouts1-component',
    templateUrl: 'cashouts1.component.html'
})

export class Cashouts1Component implements OnInit, OnDestroy {

    ngOnInit(){
        this.activeLink();
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
}

