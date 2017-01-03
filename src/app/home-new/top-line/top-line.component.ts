import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'top-line-component',
  templateUrl: './top-line.component.html'
})
export class TopLineComponent implements AfterViewInit{

  private _activeRoute: string;

  constructor(
    private _router: Router
  ) {
    this._activeRoute = this._router.url;
  }

  ngAfterViewInit() {
    $('.current_lang').click(function () {
      $('.dropdown_lang').slideToggle();
    });

    if (this._activeRoute === '/') {
      $('.s2').attr('data-chek','btc');
      $('.dot').css('margin-left', '0px');
    }
    if (this._activeRoute === '/business') {
      $('.s2').attr('data-chek','btb');
      $('.dot').css('margin-left', '15px');
    }


    $('.s2').click(() => {
      status = $('.s2').attr('data-chek');
      if (status == 'btc')
      {
        this.handleBusinessClick();
      } else {
        this.handleClientClick();
      }
    });
  }

  handleClientClick() {
    $( ".dot" ).animate({
      "marginLeft":"0px"
    }, 500, () => {
      this._router.navigate(['/']);
    });
  }

  handleBusinessClick() {
    $( ".dot" ).animate({
      "marginLeft":"15px"
    }, 500, () => {
      this._router.navigate(['/business']);
    });
  }

}
