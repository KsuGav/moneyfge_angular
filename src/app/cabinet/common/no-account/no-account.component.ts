import { Component, Input } from '@angular/core';

@Component({
  selector: 'no-account-component',
  template:
            `
              <div class="text-center" *ngIf="show">
                  <h1>You have no accounts yet.</h1>
                  <a [routerLink]="['/en/user/cabinet/score/create']">Create first one</a>
              </div>
            `
})
export class NoAccountComponent {

  @Input()
  show: boolean = false;

}
