/* Preload SVG */
	if (document.getElementById('svgsprite') == null) {
		var ajax = new XMLHttpRequest(); 

		// ajax.open('GET', '/wp-content/themes/accel/images/sprites.svg', true);
		ajax.open('GET', 'images/sprites.svg', true);
		ajax.send();
		ajax.onload = function() {
			var div = document.createElement('div');

			div.id = 'svgsprite';
			div.innerHTML = ajax.responseText;
			document.body.insertBefore(div, document.body.childNodes[0]);
		}
	}


$(document).ready(function(){

	$(window).on('load resize', function(){
		// Header 100% height fix
	   var windowHeight = ($(window).height() - 25) * 0.8;
		$('.site-header > .container').css({'min-height': windowHeight});

		// if ( $('.site-header video').length ) {
		// 	if ( $(window).width() < 768 ) {
		// 		$('.site-header video').get(0).pause();
		// 	} else {
		// 		$('.site-header video').prop('preload','auto').get(0).play();
		// 	}
		// }
	});

	// slideToggle items

	$(document).on('click','[data-slidetoggle]',function(){
		$('#' + $(this).data('slidetoggle')).slideToggle();
		return false;
	});

	// Anchor scroll

	$('[data-anchor]').on('click', function(e){
		e.preventDefault();
		var top = $('[name="' + $(this).data('anchor') + '"]').offset().top;
		$('body,html').animate({scrollTop: top - 40}, 300);
	});


  		var randomScalingFactor = function() {
			return Math.round(Math.random() * 100);
		};
		var randomColorFactor = function() {
			return Math.round(Math.random() * 255);
		};
		var randomColor = function(opacity) {
			return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
		};

  		Chart.defaults.global.responsive = true;


 		 var pieData = {
		  type: "pie",
		  data: {
			 labels: [
				"Red",
				"Green",
				"Yellow"
			 ],
			 datasets: [
				{
				  data: [300, 50, 100],
				  backgroundColor: [
					 "#FF6384",
					 "#36A2EB",
					 "#FFCE56"
				  ],
				  hoverBackgroundColor: [
					 "#FF6384",
					 "#36A2EB",
					 "#FFCE56"
				  ]
				}]
		  },
		  options: {
			 responsive: true
		  }
		};

  		var models= {
		  'conservative': {
			 data: [
				35,
				28,
				22,
				15
			 ],
			 labels: [
				'Edisson Electric Bike',
				'Space MicroSat',
				'Eco-Solar Panel',
				'Other'
			 ]
		  },
		  'moderate': {
			 data: [
				40,
				15,
				25,
				20
			 ],
			 labels: [
				'Private Social Network',
				'Instant Messaging Bot',
				'Bitcoin Hardware Wallet',
				'Other'
			 ]
		  },
		  'aggresive': {
			 data: [
				15,
				35,
				25,
				25
			 ],
			 labels: [
				'Cold Fusion Generator',
				'Personal Jetpack',
				'AI Assistant',
				'Other'
			 ]
		  }
		}

		var config = {
		  type: 'pie',
		  options: {
			 events: false,
			 animation: {
				duration: 0
			 },
			 onAnimationComplete: function () {
				var self = this;

				var elementsArray = [];
				Chart.helpers.each(self.data.datasets, function (dataset, datasetIndex) {
				  Chart.helpers.each(dataset.metaData, function (element, index) {
					 var tooltip = new Chart.Tooltip({
						_chart: self.chart,
						_data: self.data,
						_options: self.options,
						_active: [element]
					 }, self);

					 tooltip.update();
					 tooltip.transition(Chart.helpers.easingEffects.linear).draw();
				  }, self);
				}, self);
			 }
		  },
		  data: {
			 datasets: [{
				data: [
				  2,
				  4,
				  7,
				  1
				],
				backgroundColor: [
				  "#F7464A",
				  "#46BFBD",
				  "#FDB45C",
				  "#949FB1",
				  "#4D5360",
				],
			 }],
			 labels: [
				"Edisson Electric Bike",
				"Space MicroSat",
				"Eco-Solar Panel",
				"Grey",
				"Dark Grey"
			 ]
		  },
		};

  		function setConfig(conf, type) {
		  var data = models[type];

		  conf.datasets[0].data = data.data;
		  conf.labels = data.labels;
		}

  		function renderPie() {
		  setConfig(config.data, 'conservative');
		  var ctx = document.getElementById("chart").getContext("2d");
		  window.pie = new Chart(ctx, config);
		}

		$('.chart-changer a').click(function() {
		  $(this).parent().children('.active').removeClass('active');
		  $(this).addClass('active');
		  var mode = $(this).data("mode");
		  $("#mode").text(mode);

		  setConfig(window.pie.data, mode);
		  window.pie.update();
		});

		$("#interactiv").on('slide.bs.carousel', function(evt) {
		  var nextSlide = $(evt.relatedTarget).index();

		  setTimeout(function () {
			 $('#features.carousel').carousel(nextSlide);
		  }, 10);
		});

		/*$("#interactiv").on('slid.bs.carousel', function(evt) {
		  var nextSlide = $(evt.relatedTarget).index();

		  if (nextSlide == 1 && !window.pie) {
			 renderPie();
		  }
		 });*/

		$('#interactiv .carousel-control.left').on('click',function(e){
			e.preventDefault();
			$('#interactiv').carousel('prev');
		});

		$('#interactiv .carousel-control.right').on('click',function(e){
			e.preventDefault();
			$('#interactiv').carousel('next');
		});

		renderPie();

		 /* Mobile swipe */
		$('#interactiv').carousel({
		  interval:0
		});

		$('#interactiv').carousel('prev');

	 	$(".carousel.slide")
		 .on("swiperight", function() {
			 if ($(this).find('.carousel-control.left').length) {
				 $(this).find('.carousel-control.left').click();
			 } else {
				 $(this).carousel('prev');
			 }
		 })
		 .on("swipeleft", function() {
			 if ($(this).find('.carousel-control.right').length) {
				 $(this).find('.carousel-control.right').click();
			 } else {
				 $(this).carousel('next');
			 }
		 });


	/* CHAT */

	var chat = [
		{
			'author': 'bot',
			'avatar': 'images/bot.svg',
			'msg': 'Hi! I am Wings DAO management bot. How may i be of service ?'
		},
		{
			'author': 'user',
			'avatar': 'images/face.png',
			'msg': 'show me my daos'
		},
		{
		  'author': 'bot',
		  'avatar': 'images/bot.svg',
		  'msg': 'You supported the following DAOs:<br><br> - Wings DAO<br> - Genesis DAO<br> - Helio DAO<br><br> Would you like more details ?'
		},
		{
		  'author': 'user',
		  'avatar': 'images/face.png',
		  'msg': 'yes'
		},
		{
		  'author': 'bot',
		  'avatar': 'images/bot.svg',
		  'msg':  "You currently have:<br><br> Wings DAO - 350000 Tokens (3.5%)<br> Genesis DAO - 10000 Tokens (0.01%)<br> Helio DAO - 1000 Tokens (1%)"
		},
		{
		  'author': 'user',
		  'avatar': 'images/face.png',
		  'msg': 'manage Wnigs'
		},
		{
		  'author': 'bot',
		  'avatar': 'images/bot.svg',
		  'msg':  "Did you mean manage Wings DAO ?"
		},
	  {
		 'author': 'user',
		 'avatar': 'images/face.png',
		 'msg': 'yes'
	  },
	  {
		 'author': 'bot',
		 'avatar': 'images/bot.svg',
		 'msg':  "Here are a list of options for Wings DAO:<br><br> - Create vote<br> - View status<br> - Withdraw tokens<br> - Deposit tokens<br> - More<br>"
	  },
	];

  	var chatEnabled = false;
	function chatting() {
	  if (chatEnabled) {
		 return;
	  }

	  chatEnabled = true;
	  var i = 0;

	  function postMessage(msg, cb) {
		 if (msg.author === "bot") {
			var timeout = 1000;
			if (i == 0) {
			  timeout = 0;
			}

			setTimeout(function () {
			  $('#interactive ul').append('<li class="' + msg.author + '"><img src="' + msg.avatar + '"><div class="msg">' + msg.msg + '</div></li>');
			  cb();
			}, timeout);
		 } else {
			var author = msg.author;
			var img = msg.avatar;
			var msg = msg.msg;

			$('#interactive .typist')
			  .html('')
			  .typist({
				 speed: 40,
				 cursor: false,
				 text: msg
			  });

			setTimeout(function () {
			  $('#interactive .typist').html('');
			  $('#interactive ul').append('<li class="' + author + '"><img src="' + img + '"><div class="msg">' + msg + '</div></li>');
			  cb();
			}, 1000);
		 }
	  }

	  setTimeout(function chatLoop() {
		 if (i == chat.length) {
			return;
		 } else {
			var msg = chat[i];

			postMessage(msg, function () {
			  i++;
			  setTimeout(chatLoop, 3000);
			});
		 }
	  });

	}

	var defaultState = "company";
	var anotherState = "investor";
	var futureBlock = "future-block";
	var futureBlockCount = 4;


	function changeFuture() {
		for (var i = 1; i <= futureBlockCount; i++) {
			$("#" + futureBlock + "-" + i + "-" + defaultState).show();
			$("#" + futureBlock + "-" + i + "-" + anotherState).hide();
		}
	}

	$("#forCompanies").click(function () {
		defaultState = "company";
		anotherState = "investor";
		changeFuture();
	});

	$("#forInvestors").click(function () {
		defaultState = "investor";
		anotherState = "company";
		changeFuture();
	});

  var lang = "en_GB";

  /*
  jQuery.i18n.properties({
	 name: 'Content',
	 path: 'bundle/',
	 mode: 'both',
	 language: lang,
	 checkAvailableLanguages: true,
	 async: true,
	 callback: function() {
		for (var i in $.i18n.map) {
		  $("#" + i).text($.i18n.prop(i));
		}
	 }
  });*/

  $("#subscribe-form").submit(function (e) {
	 e.preventDefault();
	 $("#subscribe_error").hide();
	 $("#subscribe_successful").hide();

	 var email = $("#subscribe-email").val();
	 $("#subscribe-form-btn").prop('disabled', true);
	 $("#subscribe_btn").text("Wait...");

	 $.ajax({
		type: "POST",
		url: "/api/subscribe",
		data: JSON.stringify({
		  email: email
		}),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function () {
		  $("#subscribe_successful").show();
		  $("#subscribe-form-btn").prop('disabled', false);
		  $("#subscribe_btn").text("Subscribe");
		},
		error: function (resp) {
		  var defaultError = "Something went wrong, contact us: support@wings.ai";
		  var error = resp.responseJSON? resp.responseJSON.error || defaultError: defaultError;

		  $("#subscribe_error").text(error);
		  $("#subscribe_error").show();
		  $("#subscribe-form-btn").prop('disabled', false);
		  $("#subscribe_btn").text("Subscribe");
		}
	 })
  });

  $("#tryout").waypoint({
	 handler: function (direction) {
		chatting();
	 }
  });
});