import { Component } from '@angular/core';

import { LoggedInGuard } from '../../services/logged-in.guard';

@Component({
  selector: 'index-component',
  templateUrl: './index.component.html'
})
export class IndexComponent {

  constructor(
    private loggedInGuard: LoggedInGuard
  ) { }

  isLoggedIn() {
    return this.loggedInGuard.isLoggedIn();
  }

}
