import { Component } from '@angular/core';
import { OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { User } from '../services/service.user';

declare const $: any;


@Component({
  selector: 'cabinet-component',
  templateUrl: './cabinet.component.html',
  styleUrls: []
})

export class CabinetComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private userService: User) {
    $('html').css('display', 'none');

    // $('head').append('<link id="styles1" rel="stylesheet" href="assets/css/cabinet/styles1.css" type="text/css" />');
    $('head').append('<link id="styles2" rel="stylesheet" href="assets/css/cabinet/styles2.css" type="text/css" />');
    $('head').append('<link id="main" rel="stylesheet" href="assets/css/cabinet/main.min.css" type="text/css" />');
    // $('head').append('<link id="fonts" rel="stylesheet" href="assets/css/cabinet/fonts.min.css" type="text/css" />');
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    $(document).ready(function() {
      $('html').fadeIn(500);
    });
  }

  ngOnDestroy() {
    // $('head').children('link#styles1').remove();
    $('head').children('link#styles2').remove();
    $('head').children('link#main').remove();
    // $('head').children('link#fonts').remove();
  }
}
