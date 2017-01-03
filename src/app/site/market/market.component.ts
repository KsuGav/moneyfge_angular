import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'market-component',
  templateUrl: 'market.component.html',
  styleUrls: [
    '../css/login.css'
  ]
})

export class MarketComponent implements OnInit {

ngOnInit(){
  this.timer()
}

  timer(){
    $('.clock').timeTo({
      timeTo: new Date(new Date('April 14 2017 00:00:00 GMT+0200 (EET)'))
    });

  }
}
