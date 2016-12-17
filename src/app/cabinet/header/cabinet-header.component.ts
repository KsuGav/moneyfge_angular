import { Component, ViewEncapsulation } from '@angular/core';
import { AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';

declare const $: any;

@Component({
  selector: 'cabinet-header-component',
  templateUrl: './cabinet-header.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: []
})
export class CabinetHeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  private activeLink: string;

  constructor(public router: Router, private modalService: ModalService) {
    const initLink = this.router.url.substr(
      this.router.url.lastIndexOf('/') + 1,
      this.router.url.length
    );
    this.activeLink = initLink;
  }

  cabinetClick() {
    this.activeLink = 'cabinet';
  }

  paymentClick() {
    this.activeLink = 'categories';
  }

  transferClick() {
    this.activeLink = 'transfer';
  }

  fillClick() {
    this.activeLink = 'fill';
  }

  scoreClick() {
    this.activeLink = 'index';
  }

  outmoneyClick() {
    this.activeLink = 'outmoney';
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.modalService.showUnderConstruction();
    $(document).ready(function(){
      $("#nav-toggle").click(function () {
        $(this).toggleClass("active");
      });
      $("#nav-toggle").click(function () {
        $(".main-menu span").slideToggle()
      });
      if ($(window).width() < 800) {
        $('.profile .fa-caret-down').click(function () {
          $(".profile-menu").toggle();
        });
      } else {
        $('.profile .fa-caret-down,.profile-menu').hover(function () {
            $(".profile-menu").show();
          }, function () {
            $(".profile-menu").hide();
          }
        );
      }

      // Popovers
      $('[data-toggle="popover"]').popover({
        html: true,
        placement: "bottom",
        trigger: "hover",
        container: "body",
        content: function () {
          return $('#MailPopover').html();
        }
      });
      // Checkbox
      $('input[type="checkbox"]')
      $.fn.toggleCheckbox = function () {
        this.attr('checked', !this.attr('checked'));
      }
      $('.checkbox').on('click', function () {
        $(this).find(':checkbox').toggleCheckbox();
        $(this).toggleClass('checked-box');
      });
      //Accordion
      $('.faq-accordeon .opened').next().show();
      var hoverAcc;
      $('.faq-accordeon .acc-heading').hover(function () {
        var that = this;
        hoverAcc = setTimeout(function () {
          $(that).addClass('opened');
          $(that).next('.acc-content').slideDown();
          $(that).parents('li').siblings().find('.acc-heading').removeClass('opened');
          $(that).parents('li').siblings().find('.acc-content').slideUp();
          return false;
        }, 200);
      }, function () {
        clearTimeout(hoverAcc);
      });
      // Succes Modal DELETE IT IF DONT NEED!!!
      $('#SuccesBlock').click(function () {
        $('#SucessModal1').addClass('opened').fadeIn();
        $('#SucessModal1').click(function () {
          $(this).fadeOut().removeClass('opened');
        });
      });
    });
  }

  ngOnDestroy () {

  }

}
