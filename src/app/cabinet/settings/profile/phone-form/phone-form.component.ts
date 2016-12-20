import { Component, OnInit } from '@angular/core';
import { ChangePhoneModel } from './ChangePhoneModel';
import { User } from '../../../../services/service.user';

@Component({
  selector: 'phone-form-component',
  templateUrl: './phone-form.component.html'
})
export class PhoneFormComponent implements OnInit {

  private user = null;

  private model = new ChangePhoneModel();

  constructor(
    private userService: User
  ) { }

  ngOnInit() {
    this.userService
      .getUser(false)
      .subscribe(
        res => this.user = res
      )
    ;
  }

}
