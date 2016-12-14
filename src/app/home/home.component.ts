import { Component, OnInit } from '@angular/core';
import { User } from '../services/service.user';

@Component({
  selector: 'new-selector',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {

  constructor(private User: User) {

  }

  ngOnInit() {

  }

}
