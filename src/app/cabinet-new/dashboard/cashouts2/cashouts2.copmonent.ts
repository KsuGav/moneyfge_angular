import { Component, OnInit, OnDestroy } from '@angular/core';

declare const $: any;

@Component({
    selector: 'cashouts2-component',
    templateUrl: 'cashouts2.component.html'
})

export class Cashouts2Component implements OnInit, OnDestroy {

    ngOnInit(){
        this.activeLink();
    }

    ngOnDestroy(){
        this.unActiveLink();
    }

    activeLink(){
        $('#cashouts_link').addClass('active')
    }

    unActiveLink(){
        $('#cashouts_link').removeClass('active')
    }

}

