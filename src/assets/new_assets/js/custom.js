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
		$('.main-menu').slideToggle();
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


	$(".expenses-cash-panel-heading__icons img").hover(function(){
		$(this).attr("src", function(index, attr){
			return attr.replace(".png", "-w.png");
		});
	}, function(){
		$(this).attr("src", function(index, attr){
			return attr.replace("-w.png", ".png");
		});
	});

	//Pie chart start

	window.chartColors = {
		red: 'rgb(255, 99, 132)',
		orange: 'rgb(255, 159, 64)',
		yellow: 'rgb(255, 205, 86)',
		green: 'rgb(75, 192, 192)',
		blue: 'rgb(54, 162, 235)',
		purple: 'rgb(153, 102, 255)',
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
				randomScalingFactor(),
				],
				backgroundColor: [
				window.chartColors.red,
				window.chartColors.orange,
				window.chartColors.yellow,
				window.chartColors.green,
				window.chartColors.blue,
				],
				label: 'Dataset 1'
			}],
			labels: [
			"Red",
			"Orange",
			"Yellow",
			"Green",
			"Blue"
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


	//Pie chart end

});


$(window).on('resize', function(){
	var win = $(this); //this = window
	if (win.width() <= 992) {
		$('.main-menu').hide();
		$('.hamburger').removeClass('is-active');
		$('.d1, .d2, .d3, .d4').hide();
	}
	if (win.width() > 992) {
		$('.main-menu').show();
	}
});