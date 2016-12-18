import { Component, ViewEncapsulation } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';

declare const $: any;

@Component({
  selector: 'cabinet-settings-component',
  templateUrl: './cabinet-settings.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: []
})
export class CabinetSettingsComponent implements OnInit, AfterViewInit, OnDestroy {

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
