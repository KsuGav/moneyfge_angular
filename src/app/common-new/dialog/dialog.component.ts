import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { AfterViewInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'dialog-component',
  templateUrl: 'dialog.component.html'
})
export class DialogComponent implements AfterViewInit {

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

  @Output() onClosed: EventEmitter<String> = new EventEmitter<String>();

  @Output() onOpen: EventEmitter<String> = new EventEmitter<String>();

  ngAfterViewInit() {
    $(this.dialog.nativeElement).on('show.bs.modal', () => this.onOpen.emit('open'));
    $(this.dialog.nativeElement).on('hidden.bs.modal', () => this.onClosed.emit('closed'));
  }

  open() {
    $(this.dialog.nativeElement).modal('show');
  }

  close() {
    $(this.dialog.nativeElement).modal('hide');
  }

}
