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

  private activeLink: string;

  constructor(
    public router: Router,
    private modalService: ModalService
  ) {
    const initLink = this.router.url.substr(
      this.router.url.lastIndexOf('/') + 1,
      this.router.url.length
    );
    this.activeLink = initLink;
  }

  profileClick() {
    this.activeLink = 'profile';
  }

  passwordClick() {
    this.activeLink = 'password';
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.modalService.showUnderConstruction();
  }

  ngOnDestroy () {

  }

}
