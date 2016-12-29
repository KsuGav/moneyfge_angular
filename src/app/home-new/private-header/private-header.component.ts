import { Component } from '@angular/core';

import { LoggedInGuard } from '../../services/logged-in.guard';

@Component({
  selector: 'private-header-component',
  templateUrl: './private-header.component.html'
})
export class PrivateHeaderComponent {

  constructor(
    private loggedInGuard: LoggedInGuard
  ) { }

  isLoggedIn() {
    return this.loggedInGuard.isLoggedIn();
  }

}
