import { Component, ViewEncapsulation } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../services/service.user';
import { AppState } from '../../app.service';

@Component({
  selector: 'site-recovery-component',
  templateUrl: './site-recovery.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../css/login.css'
  ]
})

export class SiteRecoveryComponent implements OnInit {

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
