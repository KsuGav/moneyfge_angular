import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ReplenishService } from '../../../app.services/Replenish.service';
import { CURRENCIES } from '../../../app.services/Account.service';

declare const $: any;

@Component({
  selector: 'fill-ozon-component',
  templateUrl: 'fill-ozon.component.html'
})

export class FillOzonComponent {

  errorMsg: string = '';

  currency: string = CURRENCIES[1];

  form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _replenishService: ReplenishService
  ) {
    this.createForm();
  }

  private createForm() {
    this.form = this._fb.group({
      currency: [this.currency, Validators.required],
      amount: ['', Validators.required]
    });
  }

  handleSubmit() {
    if (!this.form.valid) {
      return;
    }
    this._replenishService
      .ozon(this.form.value.amount, this.form.value.currency)
      .subscribe(
        res => {

        },
        err => {
          this.errorMsg = err.json().message;
        }
      )
    ;
  }

}

