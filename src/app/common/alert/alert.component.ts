import { Component } from '@angular/core';

@Component({
  selector: 'alert-component',
  template: `
    <div class="alert alert-{{ msgType }}" *ngIf="isAlert">
      <button type="button" class="close" (click)="closeAlert()">
        <span aria-hidden="true">&times;</span>
      </button>
      {{ msg }}
    </div>
  `
})
export class AlertComponent {

  private msg: string = '';

  private msgType: string = 'success';

  private isAlert: boolean = false;

  closeAlert() {
    this.isAlert = false;
  }

  show(type: string, msg: string) {
    this.msg = msg;
    this.msgType = type;
    this.isAlert = true;
  }

}
