import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'popup-component',
  templateUrl: 'popup.component.html'
})
export class PopupComponent {

  @Output() onOpen = new EventEmitter<String>();

  open() {

  }

}
