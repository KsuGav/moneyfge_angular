import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalService } from '../../../services/modal.service';
import { ReplenishService } from '../../../app.services/Replenish.service';
import { CURRENCIES } from '../../../app.services/Account.service';

declare const $: any;

@Component({
  selector: 'fill-ozon-component',
  templateUrl: 'fill-ozon.component.html'
})

export class FillOzonComponent {

  @ViewChild('ozonForm') ozonForm: ElementRef;

  @ViewChild('ozonAmount') ozonAmount: ElementRef;

  @ViewChild('ozonCurrency') ozonCurrency: ElementRef;

  @ViewChild('ozonApiKey') ozonApiKey: ElementRef;

  @ViewChild('ozonTimestamp') ozonTimestamp: ElementRef;

  @ViewChild('ozonReferenceNo') ozonReferenceNo: ElementRef;

  @ViewChild('ozonToken') ozonToken: ElementRef;

  @ViewChild('ozonReturnUrl') ozonReturnUrl: ElementRef;

  errorMsg: string = '';

  currency: string[] = CURRENCIES[1];

  form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _replenishService: ReplenishService,
    private _modalService: ModalService
  ) {
    this.createForm();
  }

  private createForm() {
    this.form = this._fb.group({
      currency: [this.currency, Validators.required],
      amount: ['', [Validators.required, Validators.pattern('[\.|0-9]+')]]
    });
  }

  handleSubmit() {
    if (!this.form.valid) {
      this.errorMsg = 'Please, fill form.';
      return;
    }
    this._modalService.showLoader('form');
    this._replenishService
      .ozon(this.form.value.amount, this.form.value.currency)
      .subscribe(
        (res: any) => {
          this.ozonAmount.nativeElement.value = res.amount;
          this.ozonApiKey.nativeElement.value = res.apiKey;
          this.ozonCurrency.nativeElement.value = res.currency;
          this.ozonReferenceNo.nativeElement.value = res.referenceNo;
          this.ozonReturnUrl.nativeElement.value = res.returnUrl;
          this.ozonTimestamp.nativeElement.value = res.timestamp;
          this.ozonToken.nativeElement.value = res.token;
          this.ozonForm.nativeElement.submit();
        },
        err => {
          this._modalService.hideLoader('form');
          this.errorMsg = err.json().message;
        }
      )
    ;
  }

  closeAlert() {
    this.errorMsg = '';
  }

}

