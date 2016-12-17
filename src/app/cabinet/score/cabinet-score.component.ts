import { Component, ViewEncapsulation } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'cabinet-score-component',
  templateUrl: './cabinet-score.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: []
})
export class CabinetScoreComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(public router: Router) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  ngOnDestroy () {

  }

}
