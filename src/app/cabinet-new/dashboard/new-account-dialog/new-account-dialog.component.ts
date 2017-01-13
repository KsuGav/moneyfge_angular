import {Component, ViewChild, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { n_AccountService, CURRENCIES } from '../../../app.services/Account.service';
import { DialogComponent } from '../../../common-new/dialog/dialog.component';
import { LoaderComponent } from '../../../common-new/loader/loader.component';
import { SuccessComponent } from '../../../common-new/success/success.component';

declare const $: any;
declare const toastr: any;

@Component({
  selector: 'new-account-dialog-component',
  templateUrl: 'new-account-dialog.component.html'
})
export class NewAccountDialogComponent implements OnInit{

  @ViewChild('dialog') dialog: DialogComponent;

  @ViewChild('newAccLoader') loader: LoaderComponent;

  @ViewChild('success') success: SuccessComponent;


  form: FormGroup;
  currencies = CURRENCIES;


  constructor(
    private fb: FormBuilder,
    private accountService: n_AccountService
  ) {
    this.createForm();
  }

  ngOnInit() {
    let thisObj = this;
    $("#PhoneNumber").select2({
      placeholder: 'Select currency',
      minimumResultsForSearch: Infinity,
    }).on("change", function(e) {
      thisObj.form.patchValue({currency:e.currentTarget.value});
    });
  }

  createForm() {
    this.form = this.fb.group({
      currency: [CURRENCIES[0][0], Validators.required]
    });
  }

  createAccount() {
    if (!this.form.valid) {
      return;
    }
    this.loader.toggle(true);
    this.accountService
      .createCard(this.form.value.currency)
      .subscribe(
        () => {
          this.dialog.close();
          toastr.success('New account added successfully');
          this.accountService.getAllAccounts();
        },
        err => {
          this.dialog.close();
          toastr.error(err.json().message);
        }
      );

  }

  open() {
    this.dialog.open();
  }

  close() {
    this.loader.toggle(false);
    this.dialog.close();
  }

}
