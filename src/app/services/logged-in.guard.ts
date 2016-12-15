import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { User } from './service.user';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private user: User) {}

  canActivate() {
    return this.user.isLoggedIn();
  }
}
