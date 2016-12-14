import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { User } from '../services/service.user';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: [
    'css/login.component.css'
    , 'css/intlTelInput.css'
  ]
})

export class LoginComponent implements OnInit {

  private login: string;

  private password: string;

  constructor(private userService: User, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {

  }

  resetPassword() {
    this.router.navigate(['en/site/reset-password']);
  }

  nextStep() {
    // console.log('login is: ' + this.login);
    // console.log('password is: ' + this.password);
    this.userService.userLogin(this.login, this.password);
    // this.router.navigate(['/login2']);
  }

}
