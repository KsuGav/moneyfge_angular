import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
    selector: 'history-component',
    templateUrl: 'history.component.html'
})

export class HistoryComponent implements OnInit {

    today: number = Date.now();

    ngOnInit() {
        this.showMore();
    }


    showMore(){
        $('.expenses-latest-bills_footer__showmore').click(function () {
            $(this).toggleClass('active');
            $('.expenses-latest-bills_content').toggleClass('opened');
        });
    }
}
