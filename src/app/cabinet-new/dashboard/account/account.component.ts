import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Account } from '../../../app.models/Account.model';
import { n_AccountService } from '../../../app.services/Account.service';

@Component({
  selector: 'account-component',
  templateUrl: 'account.component.html'
})
export class AccountComponent {

  constructor(
      private accountService: n_AccountService
  ) {

  }
  @Input() account: Account;
  @Output() onLock: EventEmitter<number> = new EventEmitter<number>();
  @Output() onUnlock: EventEmitter<number> = new EventEmitter<number>();

  //@Output() onSelect: EventEmitter<number> = new EventEmitter<number>();

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

}
