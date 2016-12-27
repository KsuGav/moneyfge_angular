import { Component, ViewEncapsulation } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../../../services/account.service';
import { ModalService } from '../../../services/modal.service';

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
    private accountService: AccountService,
    private modalService: ModalService
  ) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {

  }

  submitForm() {
    this.modalService.showLoader('block');
    this.accountService
      .createCard(this.currency, this.types)
      .subscribe(
        () => this.router.navigate(['/user/cabinet/score/index']),
        (error: any) => {
           this.msg = error.json().message;
           this.modalService.hideLoader('block');
        }
      )
    ;
  }

}
