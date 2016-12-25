import { Component, ViewChild } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { OutbidService } from '../../../services/outbid.service';
import { AlertComponent } from '../../../common/alert';
import { ModalService } from '../../../services/modal.service';

declare const $: any;

@Component({
  selector: 'outmoney-list-component',
  templateUrl: './outmoney-list.component.html'
})
export class OutmoneyListComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(AlertComponent) alert: AlertComponent;

  private outs;

  constructor(
    public router: Router,
    private outbidService: OutbidService,
    private modalService: ModalService
  ) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.modalService.showLoader('block');
    this.getAllOuts();
  }

  ngOnDestroy () {

  }

  getAllOuts() {
    this.outbidService
      .allOutbids()
      .subscribe(
        res => {
          this.outs = res;
          this.modalService.hideLoader('block');
        },
        err => {
          this.alert.show('danger', err.json().message);
          this.modalService.hideLoader('block');
        }
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
