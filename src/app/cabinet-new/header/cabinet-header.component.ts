import { Component, OnInit } from '@angular/core';

import { LoggedInGuard } from '../../services/logged-in.guard';

declare const $: any;

@Component({
  selector: 'new-cabinet-header-component',
  templateUrl: 'cabinet-header.component.html'
})
export class NewCabinetHeaderComponent implements OnInit {

  constructor(
    private loggedInGuard: LoggedInGuard
  ) { }

  ngOnInit(){
    this.burgerButton();
    this.activeLinks();
  }


  logout(event) {
    event.preventDefault();
    this.loggedInGuard.logout();
  }

  burgerButton(){
    if ($(window).width() > 992) {

      $('.nav_block_first>li').hover(function () {

        var id = $(this).attr('data-id');
        $('.'+id).show();
      },function () {
        $('.'+ id).hide();
      });
    }
    else {

      $('.hamburger').show();
      $('.main-menu').hide();

      $('.nav_block_first>li').on( "click", function() {
        $(this).toggleClass('opened');
        var id = $(this).attr('data-id');
        $('.'+id).slideToggle();
      });
    }

    $('.hamburger').click(function () {
      $(this).toggleClass('is-active');
      $('.main-menu, .dash-main-menu').slideToggle();
    });

    $(window).on('resize', function(){
      var win = $(this); //this = window
      if (win.width() <= 992) {
        $('.main-menu, .dash-main-menu').hide();
        $('.hamburger').removeClass('is-active');
        $('.d1, .d2, .d3, .d4').hide();
      }
      if (win.width() > 992) {
        $('.main-menu, .dash-main-menu').show();
      }
    });
  }

  activeLinks(){
    $('.dash-main-menu li').click(function(){
      $('.dash-main-menu li').removeClass('active');
      $(this).addClass('active');
    });

  }

}
