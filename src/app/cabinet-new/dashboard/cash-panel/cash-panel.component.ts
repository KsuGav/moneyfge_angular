import { Component } from '@angular/core';
import { AfterViewInit, OnDestroy } from '@angular/core';
import { n_AccountService } from '../../../app.services/Account.service';

declare const $: any;
declare const window: any;
declare const document: any;
declare const Chart: any;

@Component({
  selector: 'cash-panel-component',
  templateUrl: 'cash-panel.component.html'
})
export class CashPanelComponent implements AfterViewInit, OnDestroy {

  chartPeriod: string = ``;
  statusDate: string = 'Today';

  getSubscription;
  history;

  sumTansfers;
  sumRefill;
  sumAll;
  transferPersent;
  refillPersent;

  constructor(
      private accountService: n_AccountService
  ){
    // let locale = window.navigator.userLanguage || window.navigator.language;
    let locale = 'en-us';
    let d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - 1);
    this.chartPeriod = `${d.toLocaleString(locale, {month: "long"})} ${d.getFullYear()}`;

    this.getSubscription = this.accountService.onGetAccountHistory.subscribe(
        res => {
          this.history = res;
          let sumT = 0;
          let sumR = 0;
          // convert infos
          for (let i in this.history) {
            let infoObj = this.history[i].type;
            if (infoObj === 'Transaction') {
              let pre = this.history[i].sum;
              sumT += pre;

            } else if (infoObj === 'VisaCheckout') {
              let pre = +this.history[i].sum;
              sumR += pre;
            }

          }
          let sumAll = sumT + sumR;

          this.sumAll = sumAll;
          this.sumTansfers = sumT.toFixed(2);
          this.sumRefill = sumR.toFixed(2);
          this.transferPersent = (sumT / sumAll * 100).toFixed(0);
          this.refillPersent = (sumR / sumAll * 100).toFixed(0);
            this.setupPieChart();

        }
    );
  }

  ngAfterViewInit() {
    //this.setupIcons();
    this.hoverSettings();
    this.setupCurrencyListToggle();
    this.setupCalendars();
    // this.setupPieChart();
    // this.setupLineChart();
    // this.setupRange();
  }

  ngOnDestroy(){
    this.getSubscription.unsubscribe();
  }

  hoverSettings(){
    $('.expenses-cash-panel-heading__icons li').hover(function(){
      $(this).children().attr('src', '/assets/new_assets/img/cash-panel-icon-10-w.png')
    }, function(){
      $(this).children().attr('src', '/assets/new_assets/img/cash-panel-icon-10.png')
    })
  }
  // setupIcons() {
  //   $('.expenses-cash-panel-heading__icons li').on('click', function() {
  //     $(this).siblings().children().attr("src", function(index, attr){
  //       return attr.replace("-w.png", ".png");
  //     });
  //     $(this).children().attr("src", function(index, attr){
  //       if(!attr.includes('-w')) {
  //         return attr.replace('.png', '-w.png');
  //       } else {
  //         return attr;
  //       }
  //     });
  //   });
  //
  //   $('.expenses-cash-panel-heading__icons li').click(function(){
  //     var tab_id = $(this).attr('data-id');
  //     $('.expenses-cash-panel-heading__icons li').removeClass('active');
  //     $('.expenses-cash-panel .graph-content').removeClass('active');
  //     $(this).addClass('active');
  //     $("#"+tab_id).addClass('active');
  //   });
  // }

  setupCurrencyListToggle() {
    $('.summa-list-btn').click(function (e) {
      $('.expenses-cash-panel-cashlist__currency-list').slideDown();
      e.stopPropagation();
      return false;
    });
    $(document).click(function() {
      $('.expenses-cash-panel-cashlist__currency-list').slideUp();
    });
  }


  setupRange(){
    //Range Thumb
    $('.cash-list-panel__range').each(function() {
      if ( $(this).attr('value') == '0' ) {
        $(this).addClass('null');
      } else {
        $(this).removeClass('null');
      }
    }).on('input', function(e){
      var min = e.target.min,
          max = e.target.max,
          val = e.target.value;

      $(e.target).css({
        'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
      });
    }).trigger('input');
  }


  setupCalendars() {
    $('#mycalendar1').monthly({
      weekStart: 'Mon',
      mode: 'picker',
      // The element that will have its value set to the date you picked
      target: '#mytarget',
      // Set to true if you want monthly to appear on click
      startHidden: true,
      // Element that you click to make it appear
      showTrigger: '#mytarget',
      // Add a style to days in the past
      stylePast: true,
      // Disable clicking days in the past
      disablePast: false
    });

    $('#mycalendar2').monthly({
      weekStart: 'Mon',
      mode: 'picker',
      // The element that will have its value set to the date you picked
      target: '#mytarget2',
      // Set to true if you want monthly to appear on click
      startHidden: true,
      // Element that you click to make it appear
      showTrigger: '#mytarget2',
      // Add a style to days in the past
      stylePast: true,
      // Disable clicking days in the past
      disablePast: false
    });
  }

  setupPieChart() {
        window.chartColors = {
      white: '#fff',
      orange: '#f7b403',
      green: '#26bd00',
      blue: '#38cffd'
    };

    // window.randomScalingFactor = function() {
    //   return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
    // };
    //
    // var randomScalingFactor = function() {
    //   return Math.round(Math.random() * 100);
    // };

    var config = {
      type: 'pie',
      data: {
        datasets: [{
          data: [
              0,
              this.transferPersent,
              this.refillPersent,
              0,
            // randomScalingFactor(),
            // randomScalingFactor(),
            // randomScalingFactor(),
            // randomScalingFactor(),
          ],
          backgroundColor: [
            window.chartColors.white,
            window.chartColors.orange,
            window.chartColors.green,
            window.chartColors.blue,
          ],
          label: 'Dataset 1'
        }],
        labels: [
          "Transfers",
          "Payments",
          "Refill",
          "Cashouts",
        ]
      },
      // options: {
      //   responsive: true
      // }
    };

    Chart.defaults.global.legend.display = false;

    var ctx = document.getElementById("chart-area").getContext("2d");
    window.myPie = new Chart(ctx, config);

    // $('input[type=range]').on('input', function(e){
    //   var min = e.target.min,
    //     max = e.target.max,
    //     val = e.target.value;
    //
    //   $(e.target).css({
    //     'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
    //   });
    // }).trigger('input');

      // //Range Thumb
      $('.cash-list-panel__range')
          .each(function() {
          if ( $(this).attr('value') == '0' ) {
              $(this).addClass('null');
          } else {
              $(this).removeClass('null');
          }
      })
          .on('input', function(e){
          var min = e.target.min,
              max = e.target.max,
              val = e.target.value;
          console.log(val);

          $(e.target).css({
              'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
          });
      }).trigger('input');
  }

  setupLineChart() {
    var buyerData = {
      labels: ["1", "2", "3", "4", "5", "6", "7", "1", "2", "3", "4", "5", "6", "7", "1", "2", "3", "4", "5", "6", "7"],
      datasets: [
        {
          label: "Продукти",
          fill: false,
          lineTension: 0,
          borderColor: "#fff",
          borderWidth: 1,
          pointBorderColor: "#fff",
          pointBackgroundColor: "#3d5e8b",
          pointRadius: 3,
          pointHitRadius: 10,
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#fff",
          data: [32, 40, 30, 60, 35, 10, 12, 35, 64, 31, 12, 21, 43, 34],
          spanGaps: false,
        },
        {
          label: "Послуги",
          fill: false,
          lineTension: 0,
          borderColor: "#f6bc2c",
          borderWidth: 1,
          pointBorderColor: "#f6bc2c",
          pointBackgroundColor: "#3d5e8b",
          pointRadius: 3,
          pointHitRadius: 10,
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "#f6bc2c",
          pointHoverBorderColor: "#f6bc2c",
          data: [42, 60, 32, 50, 40, 60, 40, 52, 40, 30, 20, 60, 80, 90],
          spanGaps: false,
        }
      ]
    }

    Chart.defaults.global.defaultColor = "#fff";
    Chart.defaults.global.defaultFontColor = "rgba(255,255,255,.3)";
    Chart.defaults.global.defaultFontSize = 8;
    Chart.defaults.global.defaultFontFamily = 'Roboto';
    Chart.defaults.global.elements.rectangle.borderColor = "rgba(255,255,255,.3)";

    var buyers = document.getElementById('line-chart-area').getContext('2d');

    var scatterChart = new Chart(buyers, {
      type: 'line',
      data: buyerData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {
              stepSize: 1
            },
            gridLines:{
              color:"rgba(99, 126, 162, 0.16)",
              zeroLineColor: '#3d5e8b',
              drawBorder: false,
            }
          }],
          yAxes: [{
            ticks: {
              max: 150,
              min: 0,
              stepSize: 50
            },
            gridLines:{
              color:"rgba(255, 255, 255, 0.16)",
              zeroLineColor: 'rgba(255, 255, 255, 0.16)',
              drawBorder: false,
            },
            position: 'right',
          }],
        }
      }
    });
  }

}
