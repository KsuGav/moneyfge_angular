import { Component, ViewChild, ElementRef, Input } from '@angular/core';

declare const $: any;

@Component({
  selector: 'dialog-component',
  templateUrl: 'dialog.component.html'
})
export class DialogComponent {

  @ViewChild('dialog') dialog: ElementRef;

  @Input() title: string = 'Dialog title';

  open() {
    $(this.dialog.nativeElement).modal('show');
  }

  close() {
    $(this.dialog.nativeElement).modal('hide');
  }

}
