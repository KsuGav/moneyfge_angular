import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'transfer-popup-component',
  templateUrl: 'transfer-popup.component.html'
})
export class TransferPopupComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.setupLinks();
  }

  setupLinks() {
    $('#AccBLock1 .account-fill-tabs li').click(function(){
      var tab_id = $(this).attr('data-tab');
      $('#AccBLock1 .account-fill-tabs li').removeClass('active');
      $('#AccBLock1 .account-fill-block--right').removeClass('active');
      $(this).addClass('active');
      $("#"+tab_id).addClass('active');
    });
  }

}
