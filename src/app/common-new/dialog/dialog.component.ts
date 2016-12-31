import { Component, ViewChild, ElementRef, Input } from '@angular/core';

declare const $: any;

@Component({
  selector: 'dialog-component',
  templateUrl: 'dialog.component.html'
})
export class DialogComponent {

  private _size: string = '';

  @ViewChild('dialog') dialog: ElementRef;

  @Input() title: string = 'Dialog title';

  @Input()
  set size(val: string) {
    this._size = val;
  }

  get size() {
    return this._size ? `modal-${this._size}` : '';
  }

  open() {
    $(this.dialog.nativeElement).modal('show');
  }

  close() {
    $(this.dialog.nativeElement).modal('hide');
  }

}
