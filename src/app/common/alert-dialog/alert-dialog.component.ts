import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare const $: any;

@Component({
  selector: 'alert-dialog-component',
  templateUrl: './alert-dialog.component.html'
})

export class AlertDialogComponent implements OnInit {
  // @Output()
  // sendCode: EventEmitter<String> = new EventEmitter<String>();

  @Input()
  message: string;

  private alertDialog;

  constructor(

  ) { }

  ngOnInit() {
    this.alertDialog = $('#alert-dialog');
  }

  openCode(){
    this.alertDialog.modal('show');
  }

  sendOk(){
    this.alertDialog.modal('hide');
    // this.sendCode.emit(this.smsCode);
  }
}

