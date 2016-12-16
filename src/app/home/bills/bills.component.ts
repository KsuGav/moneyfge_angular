import { Component, ViewEncapsulation } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'bills-component',
  templateUrl: './bills.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../css/home.css'
  ]
})
export class BillsComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor() {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  ngOnDestroy () {

  }

}


