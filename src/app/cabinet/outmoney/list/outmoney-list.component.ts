import { Component, ViewEncapsulation } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OutbidService } from '../../../services/outbid.service';

declare const $: any;

@Component({
  selector: 'outmoney-list-component',
  templateUrl: './outmoney-list.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: []
})
export class OutmoneyListComponent implements OnInit, AfterViewInit, OnDestroy {

  private outs;

  private msg;

  constructor(
    public router: Router,
    private outbidService: OutbidService
  ) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.getAllOuts();
  }

  ngOnDestroy () {

  }

  getAllOuts() {
    this.outbidService
      .allOutbids()
      .subscribe(
        res => this.outs = res,
        err => this.msg = err.json().message
      )
  }

  status(out) {
    if (out.is_froze) {
      return 'Froze';
    }
    if (out.is_good) {
      return 'Commited';
    }
    return 'Open';
  }

}
