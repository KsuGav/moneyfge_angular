import { Component, ViewEncapsulation } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'score-index-component',
  templateUrl: './score-index.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: []
})
export class ScoreIndexComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(public router: Router) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  ngOnDestroy () {

  }

}
