import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Account } from '../../../app.models/Account.model';
import { n_AccountService } from '../../../app.services/Account.service';

declare const $: any;

@Component({
  selector: 'account-component',
  templateUrl: 'account.component.html'
})
export class AccountComponent implements OnInit {

  constructor(
      private accountService: n_AccountService
  ) {

  }
  @Input() account: Account;
  @Output() onLock: EventEmitter<number> = new EventEmitter<number>();
  @Output() onUnlock: EventEmitter<number> = new EventEmitter<number>();

  //@Output() onSelect: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(){
    this.accountBg();
    this.accountActive();

  }

  handleLock(event: Event, id: number) {
    event.preventDefault();
    this.onLock.emit(id);
  }

  handleUnlock(event: Event, id: number) {
    event.preventDefault();
    this.onUnlock.emit(id);
  }

  handleAccountSelection(event: Event, id: number) {
    event.preventDefault();
    let li=$(event.target);
    this.accountService.getAccountHistory(id);


    //this.onSelect.emit(id);
    // if(li.hasClass==='unactiveAccount'){
    //   li.addClass('activeAccount')
    //       .removeClass('unactiveAccount');
    //
    // }else if(li.hasClass==='activeAccount'){
    //   li.addClass('unactiveAccount')
    //       .removeClass('activeAccount');
    // }
  }

  selectAccount(element: Element) {
    //$(element)
    // make current account active and other non-active
    element.classList.add('active');
  }

  accountBg(){
    let first = $('.accounts-item').first();
    first.css({'background':'#D8D8D8'});
  }

  accountActive(){
    // $('.accounts-item').mouseover(function(){
    //   $(this).css({'background':'#D8D8D8'});
    // }).mouseout(function(){
    //   $(this).css({'background':'rgba(76, 76, 75, 0)'})
    // ;
    // })
    $('.accounts-item').click(function() {
      // $('.accounts-item').css({'background': 'rgba(76, 76, 75, 0)'})
      //     .mouseover(function(){
      //         $(this).css({'background':'#D8D8D8'});
      //       }).mouseout(function(){
      //         $(this).css({'background':'rgba(76, 76, 75, 0)'});
      //       });
      // $(this).addClass('activeAccount').removeClass('unactiveAccount');
        $('.accounts-item').css({'background':'rgba(76, 76, 75, 0)'});
        $(this).css({'background':'#D8D8D8'});
    });

  }

}
