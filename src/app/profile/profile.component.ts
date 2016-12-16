import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { User } from '../services/service.user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: []
})

export class ProfileComponent implements OnInit, OnDestroy {

  constructor(
    private userService: User,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

}
