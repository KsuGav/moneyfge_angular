import { Component, ViewEncapsulation } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedInGuard } from '../../services/logged-in.guard';
import { ModalService } from '../../services/modal.service';

declare const $: any;

@Component({
  selector: 'home-header-component',
  templateUrl: './home-header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: []
})
export class HomeHeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  private loginText: string;

  private loginUrl: string;

  private registerText: string;

  private registerUrl: string;

  constructor(
    private router: Router,
    private loggedInGuard: LoggedInGuard,
    private modalService: ModalService
  ) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.modalService.showUnderConstruction();
    this.setupDropdownMenu();
    this.buttons();
  }

  ngOnDestroy () {

  }

  buttons() {
    if (this.loggedInGuard.isLoggedIn()) {
      this.loginText = 'Profile';
      this.loginUrl = '/en/user/cabinet';
      this.registerText = 'Sign Out';
      this.registerUrl = '';
    } else {
      this.loginText = 'Login';
      this.loginUrl = '/en/user/sign-in/login';
      this.registerText = 'Registration';
      this.registerUrl = '/en/site/register';
    }
  }

  logout(event) {
    // event.preventDefault();
    console.log('Logout');
    this.loggedInGuard.logout();
  }

  setupDropdownMenu() {
    // Main Menu
    $(".main-menu li").hover(
      function() {
        $(this).addClass( "hover" );
      }, function() {
        $(this).removeClass( "hover" );
      });

    // Mobile Menu
    $('.main-menu').children().clone().appendTo('.mobile-menu');

    // Burger
    $("#nav-toggle").click(function() {
      $(this).toggleClass("active");
      $(".mobile-menu").toggleClass("active");
    });

    // Equal Height
    $(".block-items .block-item").equalHeights();
    $(".dop-menu a").equalHeights();
    $(".partner-list-item").equalHeights();

    // Selectize
    $('select').selectize();
  }
}
