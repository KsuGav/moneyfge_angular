import { Component, Input } from '@angular/core';

@Component({
  selector: 'no-account-component',
  template:
            `
              <div class="text-center" *ngIf="show">
                  <h1 i18n>You have no accounts yet.</h1>
                  <a [routerLink]="['/user/cabinet/score/create']" i18n>Create first one</a>
              </div>
            `
})
export class NoAccountComponent {

  @Input()
  show: boolean = false;

}
