import { Component, ViewChild, ElementRef } from '@angular/core';

declare const $: any;

@Component({
  selector: 'loader-component',
  templateUrl: 'loader.component.html'
})
export class LoaderComponent {

  @ViewChild('loader') loader: ElementRef;

  toggle(show: boolean) {
    const overlay = $(this.loader.nativeElement)
      .find('.overlay-pane');
    if (show) {
      overlay.show();
    } else {
      overlay.hide();
    }
  }

}
