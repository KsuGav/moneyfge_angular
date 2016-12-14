import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { AppState } from './app.service';

import { User } from './services/service.user';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.html',
  providers: [ User ]
})
export class AppComponent implements OnInit {

  constructor(public appState: AppState, private userService: User) {}

  ngOnInit() {
    // this.userService.getGuestToken();
  }

}
