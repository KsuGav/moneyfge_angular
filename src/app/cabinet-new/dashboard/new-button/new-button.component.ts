import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'new-button-component',
  templateUrl: 'new-button.component.html'
})
export class NewButtonComponent {

  @Input() text: string = 'New account';

  @Input() image: string = 'dasboard-icon-4.png';

  @Output() onClick: EventEmitter<String> = new EventEmitter<String>();

  handleClick(event) {
    event.preventDefault();
    this.onClick.emit('click');
  }

}
