import { Component, OnInit } from '@angular/core';

import { LoggedInGuard } from '../../services/logged-in.guard';

import { UserService } from '../../app.services/User.service';
import { User } from '../../app.models/User.model';
import {Observable} from 'rxjs/Rx';

declare const $: any;
declare const toastr: any;

@Component({
  selector: 'new-cabinet-header-component',
  templateUrl: 'cabinet-header.component.html'
})
export class NewCabinetHeaderComponent implements OnInit {

  userName: any;
  userInfo: User;

  getUserSubscription;

  constructor(
    private loggedInGuard: LoggedInGuard,
    private userService: UserService
    // private userService: UserService

  ) { }


  ngOnInit(){
    this.burgerButton();
    let userName = sessionStorage.getItem('telephone');
    if('undefined' != typeof userName && userName && 'undefined' != userName) {
      this.userName = sessionStorage.getItem('telephone');
    } else {
      this.getUserSubscription = this.userService.getUserInfo()
          .subscribe(
              (res: any) => {
                this.userInfo = res;
                this.userName = res.telephone;
                sessionStorage.setItem('telephone', this.userName);
              },
              err => {
                toastr.error(err.json().message);
              });
    }

    // this.activeLinks();
    // this.userService.getUserInfo()
    //     .subscribe(user => {
    //       this.user = user;
    //     });

  }

  logout(event) {
    event.preventDefault();
    this.loggedInGuard.logout();
  }

  burgerButton(){
    if ($(window).width() > 992) {
      let id;
      $('.nav_block_first>li').hover(function () {

        id = $(this).attr('data-id');
        $('.'+id).show();
      },function () {
        $('.'+ id).hide();
      });
    }
    else {

      $('.hamburger').show();
      $('.main-menu').hide();

      $('.nav_block_first>li').on( "click", function() {
        $(this).toggleClass('opened');
        var id = $(this).attr('data-id');
        $('.'+id).slideToggle();
      });
    }

    $('.hamburger').click(function () {
      $(this).toggleClass('is-active');
      $('.main-menu, .dash-main-menu').slideToggle();
    });

    $(window).on('resize', function(){
      var win = $(this); //this = window
      if (win.width() <= 992) {
        $('.main-menu, .dash-main-menu').hide();
        $('.hamburger').removeClass('is-active');
        $('.d1, .d2, .d3, .d4').hide();
      }
      if (win.width() > 992) {
        $('.main-menu, .dash-main-menu').show();
      }
    });
  }

  // activeLinks(){
  //   $('.dash-main-menu li').click(function(){
  //     $('.dash-main-menu li').removeClass('active');
  //     $(this).addClass('active');
  //   });
  //
  // }

}
