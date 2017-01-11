import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { n_AccountService, CURRENCIES } from '../../../app.services/Account.service';
import { DialogComponent } from '../../../common-new/dialog/dialog.component';
import { LoaderComponent } from '../../../common-new/loader/loader.component';
import { SuccessComponent } from '../../../common-new/success/success.component';


declare const toastr: any;

@Component({
  selector: 'new-account-dialog-component',
  templateUrl: 'new-account-dialog.component.html'
})
export class NewAccountDialogComponent {

  @ViewChild('dialog') dialog: DialogComponent;

  @ViewChild('loader') loader: LoaderComponent;

  @ViewChild('success') success: SuccessComponent;


  form: FormGroup;

  currencies: string[] = CURRENCIES;

  constructor(
    private fb: FormBuilder,
    private accountService: n_AccountService
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      currency: [CURRENCIES[0], Validators.required]
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
    this.success.open()
  }

  open() {
    this.dialog.open();
  }

  close() {
    this.dialog.close();
  }

  handleOnClosed() {
    this.loader.toggle(false);
  }


}
