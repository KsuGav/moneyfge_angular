import { Component, ViewEncapsulation } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';

declare const $: any;

@Component({
  selector: 'cabinet-outmoney-component',
  templateUrl: './cabinet-outmoney.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: []
})
export class CabinetOutmoneyComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    public router: Router,
    private modalService: ModalService
  ) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.modalService.showUnderConstruction();
  }

  ngOnDestroy () {

  }

}
