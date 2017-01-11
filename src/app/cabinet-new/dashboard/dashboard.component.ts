import { Component, AfterViewInit } from '@angular/core';

declare const $: any;
declare const Chart: any;
declare const window: any;
declare const document: any;

@Component({
  selector: 'dashboard-component',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.setupAdaptive();
    this.setupSelects();
    this.setupCheckboxes();
    this.setupPaymentsCards();
    this.setupElements();
  }

  setupAdaptive() {
    let id = null;
    if ($(window).width() > 992) {
      $('.nav_block_first>li').hover(function () {

        id = $(this).attr('data-id');
        $('.'+id).show();
      },function () {
        $('.'+id).hide();
      });
    } else {
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

  setupSelects() {
    $("#Phones1").select2();
    $(".select-medium").select2({
      minimumResultsForSearch: Infinity
    });
  }

  setupCheckboxes() {
    $.fn.toggleCheckbox = function () {
      this.attr('checked', !this.attr('checked'));
    }
    $('.checkbox').on('click', function () {
      $(this).find(':checkbox').toggleCheckbox();
      $(this).toggleClass('checked-box');
    });
  }

  setupPaymentsCards() {
    $('#CreditCardInput').payment('formatCardNumber');
    $('#CreditCardInput2').payment('formatCardNumber');
    $('#CVC').payment('formatCardCVC');
    $('#CVC2').payment('formatCardCVC');
  }

  setupElements() {
    $('.expenses-latest-bills_header__date').val('qwe');
  }

}
