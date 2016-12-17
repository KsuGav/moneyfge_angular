import { Component, ViewEncapsulation } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';

declare const $: any;

@Component({
  selector: 'score-create-component',
  templateUrl: './score-create.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: []
})
export class ScoreCreateComponent implements OnInit, AfterViewInit, OnDestroy {

  private currency: string = 'USD';

  private types: string = 'card';

  private msg: string;

  constructor(
    public router: Router,
    private accountService: AccountService
  ) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {

  }

  submitForm() {
    // console.log(this.currency);
    this.accountService
      .createCard(this.currency, this.types)
      .subscribe(
        (response: any) => {
          this.router.navigate(['/en/user/cabinet/score/index']);
        },
        (error: any) => {
           this.msg = error.json().message();
        }
      )
    ;
  }

}
