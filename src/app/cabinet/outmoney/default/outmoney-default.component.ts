import { Component, ViewEncapsulation } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'outmoney-default-component',
  templateUrl: './outmoney-default.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: []
})
export class OutmoneyDefaultComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(public router: Router) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  ngOnDestroy () {

  }

}
