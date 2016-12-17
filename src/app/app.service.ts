import { Injectable } from '@angular/core';

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  _state: InternalStateType = { };

  constructor() {
    this.set('siteEndpoint', 'http://moneyfge-new.localhost/app_dev.php');
    this.set('apiEndpoint', `${this.get('siteEndpoint')}/api/v1`);
    this.set('clientId', '3_p08hEG4THmS3TPlOpS9cYqsh9Aj3vxGUYN8XtmxWLjVtfzoqHg');
    this.set('clientSecret', '7LYlYxmWBhyjosH3RvRybyCyogmOODppWo6YTLOgBljujlmHSB');
    this.set('gToken', 'NzcyN2M5YTBlZmJkMGUyOGI1MzVlMWUwZTI3YmRkOGMzMzg0MzFhMGRkNTYwMzJmOWY0NzIwY2FhODA3MmI2MA');
    this.set('aToken', 'ZTk5YjkxZTVlMDIwM2YwYzFiODYwYjVmODEyZjhjNjBkNTYwOWU1Y2MxZmJjNDAzNDNkY2IxMzk5ODc5OWNkMw');
    this.set('loggedIn', true);
  }

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }


  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }


  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify( object ));
  }
}
