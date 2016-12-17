import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { User } from '../../services/service.user';
import { ModalService } from '../../services/modal.service';

declare const $: any;

@Component({
  selector: 'cabinet-transfer',
  templateUrl: './cabinet-transfer.component.html',
  styleUrls: [

  ]
})

export class CabinetTransferComponent implements OnInit, AfterViewInit, OnDestroy {

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

