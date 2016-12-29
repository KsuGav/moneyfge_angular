import { Component, AfterViewInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'nav-line-component',
  templateUrl: './nav-line.component.html'
})
export class NavLineComponent implements AfterViewInit {

  ngAfterViewInit() {
    let id = null;
    if ($(window).width() > 992) {

      $('.nav_block_first>li').hover(function () {

        id = $(this).attr('data-id');
        $('.'+id).show();
      },function () {
        $('.'+id).hide();
      });
    }
    else {
      $('.hamburger').show();
      $('.main-menu').hide();

      $('.nav_block_first>li').on( "click", function() {
        $(this).toggleClass('opened');
        id = $(this).attr('data-id');
        $('.'+id).slideToggle();
      });
    }

    $('.hamburger').click(function () {
      $(this).toggleClass('is-active');
      $('.main-menu').slideToggle();
    });
  }

}
