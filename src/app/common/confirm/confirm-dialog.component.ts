import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare const $: any;

@Component({
  selector: 'confirm-dialog-component',
  templateUrl: './confirm-dialog.component.html'
})

export class ConfirmDialogComponent implements OnInit {
  // @Output()
  // sendCode: EventEmitter<String> = new EventEmitter<String>();

  @Input()
  message: string;

  private confirmDialog;

  constructor(

  ) { }

  ngOnInit() {
    this.confirmDialog = $('#confirm-dialog');
  }

  openCode(){
    this.confirmDialog.modal('show');
  }

  answerYes(){
    this.confirmDialog.modal('hide');
  }

  answerNo(){
    this.confirmDialog.modal('hide');
    // this.sendCode.emit(this.smsCode);
  }
}

