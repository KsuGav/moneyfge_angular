import { Component } from '@angular/core';
import { OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { User } from '../../services/service.user';

declare const $: any;

@Component({
  selector: 'cabinet-main',
  templateUrl: './cabinet-main.component.html'
})

export class CabinetMainComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private User: User) {
  }

  ngOnInit() {
    (function ($) {
      $(function () {
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
      $(document).ready(function () {
        setTimeout(function () {
          $('.alert').fadeOut(500);
        }, 5000);
        $("#logout_btn").click(function () {

          $.ajax({
            type: "POST",
            url: "/user/sign-in/logout",
            data: "_csrf=" + $('meta[name="csrf-token"]').attr("content"),
            error: function (msg) {

              if (msg.status == 302) {
                window.location.href = "/";
              }
            }
          });
        });
      });
    })($);
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
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {

  }

}

