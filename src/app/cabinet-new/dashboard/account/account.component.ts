import { Component, Input } from '@angular/core';

import { Account } from '../../../app.models/Account.model';

@Component({
  selector: 'account-component',
  templateUrl: 'account.component.html'
})
export class AccountComponent {

  @Input() account: Account;

}
