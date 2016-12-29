import { Component } from '@angular/core';

import { LoggedInGuard } from '../../services/logged-in.guard';

@Component({
  selector: 'new-cabinet-header-component',
  templateUrl: 'cabinet-header.component.html'
})
export class NewCabinetHeaderComponent {

  constructor(
    private loggedInGuard: LoggedInGuard
  ) { }

  logout(event) {
    event.preventDefault();
    this.loggedInGuard.logout();
  }

}
