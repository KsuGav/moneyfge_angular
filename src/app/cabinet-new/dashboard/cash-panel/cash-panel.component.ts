import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { n_AccountService } from '../../../app.services/Account.service';

declare const $: any;
declare const window: any;
declare const document: any;
declare const Chart: any;

@Component({
  selector: 'cash-panel-component',
  templateUrl: 'cash-panel.component.html'
})
export class CashPanelComponent implements OnInit {

  chartPeriod: string = ``;
  statusDate: string = 'Today';
  rangesData;

  getAccountSubscription;

  constructor(
      private accountService: n_AccountService
  ){
  }

  ngOnInit() {
    this.initCalendar();
    this.getAccountSubscription = this.accountService.onGetAccountHistory.subscribe(
        res => {
          this.rangesData = this.accountService.getRangesData();
          console.log(this.rangesData, 'init');

          this.initRanges();
          this.initChart();
        },
        err => {

        }
    );
  }

  initCalendar() {
    // let locale = window.navigator.userLanguage || window.navigator.language;
    let locale = 'en-us';
    let d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - 1);
    this.chartPeriod = `${d.toLocaleString(locale, {month: "long"})} ${d.getFullYear()}`;
  }

  initChart() {

  }

  initRanges() {

  }

}
