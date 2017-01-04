import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'fast-btns-component',
  templateUrl: 'fast-btns.component.html'
})
export class FastBtnsComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.setupAdaptive();
    this.setupClicks();
  }

  setupAdaptive() {
    $('.fast-btns .small-device-btn').click(function (e) {
      $('.fast-btns .main-btns').toggleClass('active');
      e.stopPropagation();
      return false;
    });

    $(document).click(function() {
      $('.fast-btns .main-btns').removeClass('active');
    });
  }

  setupClicks() {
    $('.fast-btn').magnificPopup({
      type:'inline',
      midClick: true,
      closeBtnInside: false,
      removalDelay: 300,
      preloader: false,
      fixedContentPos: false,
      fixedBgPos: true,
      mainClass: 'my-mfp-slide-bottom'
    });
  }

}
