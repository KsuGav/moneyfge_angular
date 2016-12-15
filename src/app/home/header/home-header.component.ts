import { Component, ViewEncapsulation } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';

declare const $: any;

@Component({
  selector: 'home-header-component',
  templateUrl: './home-header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: []
})
export class HomeHeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor() {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.setupDropdownMenu();
  }

  ngOnDestroy () {

  }

  setupDropdownMenu() {
    // Main Menu
    $(".main-menu li").hover(
      function() {
        $(this).addClass( "hover" );
      }, function() {
        $(this).removeClass( "hover" );
      });

    // Mobile Menu
    $('.main-menu').children().clone().appendTo('.mobile-menu');

    // Burger
    $("#nav-toggle").click(function() {
      $(this).toggleClass("active");
      $(".mobile-menu").toggleClass("active");
    });

    // Equal Height
    $(".block-items .block-item").equalHeights();
    $(".dop-menu a").equalHeights();
    $(".partner-list-item").equalHeights();

    // Selectize
    $('select').selectize();
  }
}
