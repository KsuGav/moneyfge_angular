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
    console.log(`${id} account was selected.`);
    this.accountService.getAccountHistory(id);
    //this.onSelect.emit(id);
  }

  selectAccount(element: Element) {
    //$(element)
    // make current account active and other non-active
    element.classList.add('active');

  }

  accountBg(){
    let first = $('.accounts-item').first();
    first.css({'background':'#D8D8D8'})
  }

}
