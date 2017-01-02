import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'timer-link-component',
  templateUrl: 'timer-link.component.html'
})
export class TimerLinkComponent {

  @Input() text: string = 'Default Text';

  @Output() onClick = new EventEmitter<String>();

  seconds: number = 0;

  private _interval: any = null;

  handleClick(event: Event) {
    event.preventDefault();
    if (this.seconds > 1) {
      return;
    }
    this.seconds = 60;
    this._interval = setInterval(this.tick, 1000);
    event.preventDefault();
    this.onClick.emit('click');
  }

  tick = () => {
    if (this.seconds > 1) {
      this.seconds -= 1;
    } else {
      clearInterval(this._interval);
    }
  }

  reset() {
    this.seconds = 0;
    clearInterval(this._interval);
  }

}
