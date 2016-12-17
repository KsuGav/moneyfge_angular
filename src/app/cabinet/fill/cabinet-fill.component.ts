import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { User } from '../../services/service.user';

declare const $: any;

@Component({
  selector: 'cabinet-fill',
  templateUrl: './cabinet-fill.component.html',
  styleUrls: [

  ]
})

export class CabinetFillComponent implements OnInit, OnDestroy {

  constructor(private User: User) {

  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

}

