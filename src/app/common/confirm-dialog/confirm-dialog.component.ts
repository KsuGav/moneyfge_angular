import { Component, Input, Output, EventEmitter } from '@angular/core';

declare const $: any;

@Component({
  selector: 'confirm-dialog-component',
  templateUrl: './confirm-dialog.component.html'
})

export class ConfirmDialogComponent {
  @Output()
  accept: EventEmitter<String> = new EventEmitter<String>();

  @Output()
  reject: EventEmitter<String> = new EventEmitter<String>();

  @Input()
  dialogId: string = 'default';

  @Input()
  message: string;

  constructor(

  ) { }

  open() {
    $(`#${this.dialogId}-confirm-dialog`).modal('show');
  }

  handleAccept(){
    $(`#${this.dialogId}-confirm-dialog`).modal('hide');
    this.accept.emit('accept');
  }

  handleReject(){
    $(`#${this.dialogId}-confirm-dialog`).modal('hide');
    this.reject.emit('reject');
  }
}

