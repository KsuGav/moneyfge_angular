import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'fill-account-popup-component',
  templateUrl: 'fill-account-popup.component.html'
})
export class FillAccountPopupComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.setupLinks();
    this.setupSearch();
  }

  setupLinks() {
    $('#AccBLock2 .account-fill-tabs li').click(function(){
      var tab_id = $(this).attr('data-tab');
      $('#AccBLock2 .account-fill-tabs li').removeClass('active');
      $('#AccBLock2 .account-fill-block--right').removeClass('active');
      $(this).addClass('active');
      $("#"+tab_id).addClass('active');
    });
  }

  setupSearch() {
    $('.account-fill--map-block__top-line .search-line-open').click(function () {
      $('.account-fill--map-block__top-line .search-line').slideDown();
    });
    $('.account-fill--map-block__top-line .search-line .close-search-btn').click(function () {
      $('.account-fill--map-block__top-line .search-line').slideUp();
    });
  }

}
