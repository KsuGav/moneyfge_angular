import { Component } from '@angular/core';
import { OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { User } from '../../services/service.user';
import { ModalService } from '../../services/modal.service';

declare const $: any;

@Component({
  selector: 'cabinet-fill',
  templateUrl: './cabinet-fill.component.html',
  styleUrls: [

  ]
})

export class CabinetFillComponent implements OnInit, AfterViewInit, OnDestroy {

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

