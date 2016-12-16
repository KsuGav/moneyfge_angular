import { Component, ViewEncapsulation } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../services/service.user';
import { AppState } from '../../app.service';

@Component({
  selector: 'site-register-component',
  templateUrl: './site-register.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../css/login.css'
  ]
})

export class SiteRegisterComponent implements OnInit {

  private errorMsg: string;

  constructor(
    private userService: User,
    private route: ActivatedRoute,
    private router: Router,
    private appState: AppState
  ) {

  }

  ngOnInit() {

  }

}
