import { Component, OnInit } from '@angular/core';
import { AppState } from './app.service';
import { LoggedInGuard } from './services/logged-in.guard';

declare const $: any;

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  // styleUrls: [
  //   './app.component.css'
  // ]
})
export class AppComponent implements OnInit {

  constructor(
    public appState: AppState,
    private loggedInGuard: LoggedInGuard
  ) {

  }

  ngOnInit() {
    this.loggedInGuard.guestToken();
  }

}
