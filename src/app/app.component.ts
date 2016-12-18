import { Component, OnInit } from '@angular/core';
import { AppState } from './app.service';
import { LoggedInGuard } from './services/logged-in.guard';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    public appState: AppState,
    private loggedInGuard: LoggedInGuard
  ) {}

  ngOnInit() {
    this.loggedInGuard.guestToken();
  }

}
