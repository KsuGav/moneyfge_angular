import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { User } from '../../services/service.user';

declare const $: any;

@Component({
  selector: 'cabinet-main',
  templateUrl: './cabinet-main.component.html',
  styleUrls: [
    // 'app/component/cabinet/cabinet.style.css',
    // 'app/component/cabinet/main.min.css',
    // 'app/component/cabinet/myStyle.css'
  ]
})

export class CabinetMainComponent implements OnInit, OnDestroy {

  constructor(private User: User) {
    $('head').append('<link id="cabinet-style" rel="stylesheet" href="assets/css/cabinet.style.css" type="text/css" />');
    $('head').append('<link id="main-style" rel="stylesheet" href="assets/css/cabinet/main.min.css" type="text/css" />');
    $('head').append('<link id="my-style" rel="stylesheet" href="assets/css/myStyle.css" type="text/css" />');
    $('head').append('<link id="fonts-style" rel="stylesheet" href="assets/css/cabinet/fonts.min.css" type="text/css" />');
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    $('head').children('link#cabinet-style').remove();
    $('head').children('link#main-style').remove();
    $('head').children('link#my-style').remove();
    $('head').children('link#fonts-style').remove();
  }

}

