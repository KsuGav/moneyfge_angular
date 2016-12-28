import { Component, AfterViewInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'top-line-component',
  templateUrl: './top-line.component.html'
})
export class TopLineComponent implements AfterViewInit{

  ngAfterViewInit() {
    $('.current_lang').click(function () {
      $('.dropdown_lang').slideToggle();
    });

    $('.ak_chek').attr('data-chek','btc');
    $('.ak_chek').click(function () {
      status = $('.ak_chek').attr('data-chek');
      if (status == 'btc')
      {
        $('.ak_chek').attr('data-chek','btb');
        $( ".dot" ).animate({
          "marginLeft":"15px"
        }, 500);
      }else
      {
        $( ".dot" ).animate({
          "marginLeft":"0px"
        }, 500);
        $('.ak_chek').attr('data-chek','btc');
      }
    });
  }

}
