import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Account } from '../../../app.models/Account.model';

@Component({
  selector: 'account-component',
  templateUrl: 'account.component.html'
})
export class AccountComponent {

  @Input() account: Account;

  @Output() onLock: EventEmitter<number> = new EventEmitter<number>();

  @Output() onUnlock: EventEmitter<number> = new EventEmitter<number>();

  handleLock(event: Event, id: number) {
    event.preventDefault();
    this.onLock.emit(id);
  }

  handleUnlock(event: Event, id: number) {
    event.preventDefault();
    this.onUnlock.emit(id);
  }

}
