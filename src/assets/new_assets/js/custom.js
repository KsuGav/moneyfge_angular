$(function() {

	$('.current_lang').click(function () {
		$('.dropdown_lang').slideToggle();
	});


	$('.ak_chek').attr('data-chek','btc');
	$('.ak_chek').click(function () {
		status = $('.ak_chek').attr('data-chek');
		if (status == 'btc')
		{
			$('.ak_chek').attr('data-chek','btb');
			$( ".dot" ).animate({
				"marginLeft":"15px"
			}, 500);
		}else
		{
			$( ".dot" ).animate({
				"marginLeft":"0px"
			}, 500);
			$('.ak_chek').attr('data-chek','btc');
		}
	});

	if ($(window).width() > 992) {

		$('.nav_block_first>li').hover(function () {

			id = $(this).attr('data-id');
			$('.'+id).show();
		},function () {
			$('.'+id).hide();
		});
	}
	else {

		$('.hamburger').show();
		$('.main-menu').hide();

		$('.nav_block_first>li').on( "click", function() {
			$(this).toggleClass('opened');
			id = $(this).attr('data-id');
			$('.'+id).slideToggle();
		});
	}

	$('.hamburger').click(function () {
		$(this).toggleClass('is-active');
		$('.main-menu, .dash-main-menu').slideToggle();
	});

	//Tabs
	$('.expenses-cash-panel-heading__icons li').click(function(){
		var tab_id = $(this).attr('data-id');

		$('.expenses-cash-panel-heading__icons li').removeClass('active');
		$('.expenses-cash-panel .graph-content').removeClass('active');


		$(this).addClass('active');
		$("#"+tab_id).addClass('active');
	})

	$('#AccBLock1 .account-fill-tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('#AccBLock1 .account-fill-tabs li').removeClass('active');
		$('#AccBLock1 .account-fill-block--right').removeClass('active');

		$(this).addClass('active');
		$("#"+tab_id).addClass('active');
	})

	$('#AccBLock2 .account-fill-tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('#AccBLock2 .account-fill-tabs li').removeClass('active');
		$('#AccBLock2 .account-fill-block--right').removeClass('active');

		$(this).addClass('active');
		$("#"+tab_id).addClass('active');
	})

	//Tooltip
	$('[data-toggle="tooltip"]').tooltip()

	//Message
	$('.account-fill-form').on('submit', function() {
		$('.account-fill-msg.msg-success').addClass('active');
	});

	//Search Line Open/Close
	$('.account-fill--map-block__top-line .search-line-open').click(function () {
		$('.account-fill--map-block__top-line .search-line').slideDown();
	});
	$('.account-fill--map-block__top-line .search-line .close-search-btn').click(function () {
		$('.account-fill--map-block__top-line .search-line').slideUp();
	});

	//Fast Buttons Mobile
	$('.fast-btns .small-device-btn').click(function (e) {
		$('.fast-btns .main-btns').toggleClass('active');
		e.stopPropagation();
		return false;
	});

	//Currency List Toggle
	$('.summa-list-btn').click(function (e) {
		$('.expenses-cash-panel-cashlist__currency-list').slideDown();
		e.stopPropagation();
		return false;
	});
	$(document).click(function() {
		$('.expenses-cash-panel-cashlist__currency-list').slideUp();
		$('.fast-btns .main-btns').removeClass('active');
	});


	$('.expenses-latest-bills_footer__showmore').click(function () {
		$(this).toggleClass('active');
		$('.expenses-latest-bills_content').toggleClass('opened');
		$('.equal-height-column').css('height','auto');
		$('.equal-height-column').equalHeights();
	});

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



	$('.expenses-cash-panel-heading__icons li').on('click', function() {
		$(this).siblings().children().attr("src", function(index, attr){
			return attr.replace("-w.png", ".png");
		});
		$(this).children().attr("src", function(index, attr){
			return attr.replace(".png", "-w.png");
		});

	});


	// Checkbox
	// $('input[type="checkbox"]')
	$.fn.toggleCheckbox = function () {
		this.attr('checked', !this.attr('checked'));
	}
	$('.checkbox').on('click', function () {
		$(this).find(':checkbox').toggleCheckbox();
		$(this).toggleClass('checked-box');
	});

	// Payment Card
	$('#CreditCardInput').payment('formatCardNumber');
	$('#CreditCardInput2').payment('formatCardNumber');
	$('#CVC').payment('formatCardCVC');
	$('#CVC2').payment('formatCardCVC');

	//Popup
	$('.open-popup-link').magnificPopup({
		type:'inline',
		midClick: true,
		closeMarkup: '<button title="%title%" type="button" class="mfp-close big">&#215;</button>'
	});

	$('.close-popup').click(function(){
		$.magnificPopup.close();
	});

	$('.fast-btn').magnificPopup({
		type:'inline',
		midClick: true,
		closeBtnInside: false,
		removalDelay: 300,
		preloader: false,
		fixedContentPos: false,
		fixedBgPos: true,
		mainClass: 'my-mfp-slide-bottom'
	});

	//Custom Scroll
	$('.popup-content-scroll').mCustomScrollbar({
		theme: 'minimal-dark',
		autoHideScrollbar: false,
		mouseWheel:
		{
			scrollAmount: 150
		}
	});

	//Selects
	$("#Phones1").select2();

	$(".select-medium").select2({
		minimumResultsForSearch: Infinity
	});


	//Pie chart start
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


	window.onload = function() {
		var ctx = document.getElementById("chart-area").getContext("2d");
		window.myPie = new Chart(ctx, config);
	};

	$('input[type=range]').on('input', function(e){
		var min = e.target.min,
		max = e.target.max,
		val = e.target.value;

		$(e.target).css({
			'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
		});
	}).trigger('input');

	//Pie chart end

	//Line Chart Start

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

	//Line Chart End

	$('.equal-height-column').equalHeights();
	$('.equal-expenses').equalHeights();
	$('.account-fill-equal-1').equalHeights();
	$('.account-fill-equal-2').equalHeights();
	$('.account-fill-equal-3').equalHeights();

});

$(window).resize(function () {
	$('.equal-height-column').css('height','auto');
	$('.equal-height-column').equalHeights();

	$('.equal-expenses').css('height','auto');
	$('.equal-expenses').equalHeights();

	$('.account-fill-equal-1').css('height','auto');
	$('.account-fill-equal-1').equalHeights();

	$('.account-fill-equal-2').css('height','auto');
	$('.account-fill-equal-2').equalHeights();

	$('.account-fill-equal-3').css('height','auto');
	$('.account-fill-equal-3').equalHeights();
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
