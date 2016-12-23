import { Component } from '@angular/core';

declare const $: any;

@Component({
  selector: 'link-counter-component',
  templateUrl: './link-counter.component.html'
})

export class LinkCounterComponent {

  private secs: number = 0;

  private interval;

  counter(){
    if (this.secs > 0 && this.secs < 60) {
      return;
    }
    this.secs = 60;
    this.interval = setInterval(() => {
      if (this.secs === 0) {
        clearInterval(this.interval);
        this.secs = 60;
        return;
      }
      this.secs -= 1;
    }, 1000);


  }

}
