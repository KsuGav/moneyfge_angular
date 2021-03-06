import { Component } from '@angular/core';
import { LoggedInGuard } from '../../services/logged-in.guard';

@Component({
  selector: 'logo-line-component',
  templateUrl: './logo-line.component.html'
})
export class LogoLineComponent {

  constructor(
    private loggedInGuard: LoggedInGuard
  ) { }

  isLoggedIn() {
    return this.loggedInGuard.isLoggedIn();
  }

  logout(event) {
    event.preventDefault();
    this.loggedInGuard.logout();
  }

}
