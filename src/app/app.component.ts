import { Component, OnInit } from '@angular/core';
import { AppState } from './app.service';
import { User } from './services/service.user';

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

  constructor(public appState: AppState, private userService: User) {}

  ngOnInit() {
    // this.userService.guestToken();
  }

}
