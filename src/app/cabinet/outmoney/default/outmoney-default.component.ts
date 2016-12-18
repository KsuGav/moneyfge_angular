import { Component, ViewEncapsulation } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { OutbidService } from '../../../services/outbid.service';


declare const $: any;

@Component({
  selector: 'outmoney-default-component',
  templateUrl: './outmoney-default.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: []
})
export class OutmoneyDefaultComponent implements OnInit, AfterViewInit, OnDestroy {

  private accs;

  private msg;

  private account;

  private system;

  private systemAccount;

  private descr;

  private sum;

  constructor(
    public router: Router,
    private accountService: AccountService,
    private outbidService: OutbidService
  ) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.getAccounts();
  }

  ngOnDestroy () {

  }

  getAccounts() {
    this.accountService
      .getAllCard()
      .subscribe(
        res => this.accs = res.active,
        err => this.msg = err.json().message
      )
    ;
  }

  submitForm(event) {
    event.preventDefault();
    this.outbidService
      .createOutbid(this.sum, this.descr, this.system, this.systemAccount, this.account)
      .subscribe(
        () => this.router.navigate(['/en/user/cabinet/outmoney/list']),
        err => this.msg = err.json().message
      )
    ;
  }

}
