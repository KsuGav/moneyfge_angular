import { Component } from '@angular/core';
import { OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { User } from '../../services/service.user';
import { ModalService } from '../../services/modal.service';

declare const $: any;

@Component({
  selector: 'cabinet-payment',
  templateUrl: './cabinet-payment.component.html',
  styleUrls: [

  ]
})

export class CabinetPaymentComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private User: User, private modalService: ModalService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.modalService.showUnderConstruction();
  }

  ngOnDestroy() {

  }

}

