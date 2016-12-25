import { Component, ViewChild } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from '../../../services/account.service';
import { OutbidService } from '../../../services/outbid.service';
import { ModalService } from '../../../services/modal.service';
import { AlertComponent } from '../../../common/alert';

declare const $: any;

@Component({
  selector: 'outmoney-default-component',
  templateUrl: './outmoney-default.component.html'
})
export class OutmoneyDefaultComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(AlertComponent) alert: AlertComponent;

  private accs;

  private form: FormGroup;

  constructor(
    public router: Router,
    private accountService: AccountService,
    private outbidService: OutbidService,
    private modalService: ModalService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.modalService.showLoader('block');
    this.getAccounts();
  }

  ngOnDestroy () {

  }

  createForm() {
    this.form = this.fb.group({
      from: ['', Validators.required],
      system: ['', Validators.required],
      to: ['', Validators.required],
      sum: ['', Validators.required],
      descr: ['', Validators.required]
    });
  }

  getAccounts() {
    this.accountService
      .getAllCard()
      .subscribe(
        res => {
          this.modalService.hideLoader('block');
          this.accs = res.active;
        },
        err => {
          this.modalService.hideLoader('block');
          this.alert.show('danger', err.json().message);
        }
      )
    ;
  }

  submitForm() {
    if (!this.form.valid) {
      return;
    }
    this.modalService.showLoader('block');
    this.outbidService
      .createOutbid(
        this.form.value.sum,
        this.form.value.descr,
        this.form.value.system,
        this.form.value.to,
        this.form.value.from
      )
      .subscribe(
        () => this.router.navigate(['/en/user/cabinet/outmoney/list']),
        err => {
          this.alert.show('danger', err.json().message);
          this.modalService.hideLoader('block');
        }
      )
    ;
  }

}
