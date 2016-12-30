import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { Account } from '../../../app.models/Account.model';
import { n_AccountService } from '../../../app.services/Account.service';

@Component({
  selector: 'accounts-component',
  templateUrl: 'accounts.component.html',
  providers: [
    n_AccountService
  ]
})
export class AccountsComponent implements OnInit {

  active: Account[] = [];

  constructor(
    private accountService: n_AccountService
  ) { }

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService
      .getAllAccounts()
      .subscribe(
        res => this.active = res.active
      )
  }

}
