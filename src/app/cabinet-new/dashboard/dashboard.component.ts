import { Component, AfterViewInit } from '@angular/core';

declare const $: any;
declare const Chart: any;
declare const window: any;
declare const document: any;

@Component({
  selector: 'dashboard-component',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.setupIcons();
    this.setupCalendars();
    this.setupChart();
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

  setupIcons() {
    $(".expenses-cash-panel-heading__icons img").hover(function(){
      $(this).attr("src", function(index, attr){
        return attr.replace(".png", "-w.png");
      });
    }, function(){
      $(this).attr("src", function(index, attr){
        return attr.replace("-w.png", ".png");
      });
    });
  }

  setupChart() {
    window.chartColors = {
      white: '#fff',
      orange: '#f7b403',
      blue: '#6e82a1',
      darkblue: '#345382',
      grey: 'rgb(231,233,237)'
    };

    window.randomScalingFactor = function() {
      return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
    }

    var randomScalingFactor = function() {
      return Math.round(Math.random() * 100);
    };

    var config = {
      type: 'pie',
      data: {
        datasets: [{
          data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
          ],
          backgroundColor: [
            window.chartColors.darkblue,
            window.chartColors.orange,
            window.chartColors.white,
            window.chartColors.blue,
          ],
          label: 'Dataset 1'
        }],
        labels: [
          "Продукты",
          "Здоровье",
          "Покупки",
          "Послуги",
        ]
      },
      options: {
        responsive: true
      }
    };

    Chart.defaults.global.legend.display = false;

    Chart.defaults.global.tooltips.enabled = false;

    var ctx = document.getElementById("chart-area").getContext("2d");
    window.myPie = new Chart(ctx, config);
  }

}
