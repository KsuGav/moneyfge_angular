import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { User } from '../../services/service.user';

declare const $: any;

@Component({
  selector: 'cabinet-transfer',
  templateUrl: './cabinet-transfer.component.html',
  styleUrls: [

  ]
})

export class CabinetTransferComponent implements OnInit, OnDestroy {

  constructor(private User: User) {

  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

}

