import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { User } from '../services/service.user';

declare const $: any;

@Component({
  selector: 'new-selector',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private User: User) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.setupSlider();
    this.setupDropdownMenu();
  }

  ngOnDestroy () {

  }

  setupSlider() {
    $('.slider').show();
    $('.slider').owlCarousel({
      singleItem: true,
      mouseDrag: false,
      itemsScaleUp: false,
      autoHeight: false,
      slideSpeed: 1000,
      paginationSpeed: 1000,
      rewindSpeed: 1000,
      responsiveRefreshRate: 0,
      autoPlay: true,
      stopOnHover: true,
      pagination: false,
      addClassActive: true,
      afterMove: function () {
        $('.dop-menu li.active').removeClass("active");
        const slideActif = $('.slider .active').index();
        $('.dop-menu li').eq(slideActif).addClass("active");

        // Appel contenu slide

        $('.sliderContent').hide();
        $('.sliderContent-' + slideActif).show();

      }
    });
    $('.dop-menu li').eq(0).addClass("active");
    var owl = $(".slider").data('owlCarousel');

    $(".dop-menu li").mouseover(function () {
      $(this).index();
      const slideNbr = $(this).index();
      owl.goTo(slideNbr);
      owl.stop();
    });
    $(".dop-menu li").mouseleave(function () {
      owl.play();
    });

    // Pause survol du contenu
    $(".sliderContent-0,.sliderContent-1,.sliderContent-2,.sliderContent-3,.sliderContent-4,.sliderContent-5,.sliderContent-6").mouseover(function () {
      owl.stop();
    });
    $(".sliderContent-0,.sliderContent-1,.sliderContent-2,.sliderContent-3,.sliderContent-4,.sliderContent-5,.sliderContent-6").mouseleave(function () {
      owl.play();
    });
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
