import { Component, ViewEncapsulation } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AccountService } from '../../../services/account.service';

declare const $: any;

@Component({
  selector: 'score-index-component',
  templateUrl: './score-index.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: []
})
export class ScoreIndexComponent implements OnInit, AfterViewInit, OnDestroy {

  private cards;

  private msg: string;

  constructor(
    public router: Router,
    private accountService: AccountService
  ) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.accountService
      .getAllCard()
      .subscribe(
        res => this.cards = res,
        err => this.msg = err.json().message
      )
    ;
  }

  ngOnDestroy () {

  }

}
