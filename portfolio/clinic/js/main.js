'use strict';

$(function() {

	$('div.preload').each(function( i, el) {
		if($(el).load()) {
			$(el).addClass('ready');
		};
	});

	/* MAIN SLIDER */

/*	if($('.main-slider').load()) {
		$('.main-slider').addClass('ready');
	};*/

	$('.main-slider').slick({
		arrows: false,
		dots: true,
		infinity: true,
		fade: true,
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1025,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
				}
			},
			{
				breakpoint: 940,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

$('.about-company-slider').slick({
		arrows: false,
		dots: true,
		infinity: true,
		fade: false,
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 500,
		lazyLoad: 'progressive',
		slidesToShow: 1,
		slidesToScroll: 1
	});

	/*** HEADER SEARCH FORM ***/

	$('.header__search').on('click', function(e) {
		e.preventDefault();
		$('.contacts .uk-grid').fadeOut(350, function() {
			$('.search-form').fadeIn('350', function() {
				$('.search-form input').focus();
			});
			$('.search-form').toggleClass('uk-animation-fade-in open');
			$(document).on('click keyup', hiddenSearchForm);
		});
	});

	$('#mobile-form').on('click', function() {
		$('.mobile-form').fadeToggle('350', function() {
			$(this).find('input').focus();
		});
	});

	function hiddenSearchForm (e) {
		var form = $('.search-form');
		if(e.which == 27 && $(form).hasClass('open')) {
			console.log(123)
			$(form).fadeOut('350', function() {
				$(this).toggleClass('uk-animation-fade-out open');
				$('.contacts .uk-grid').fadeIn('350');
			});
		};
	}

	/* SERVICE COAST */

	$('.service-coast').on('click','.service-coast__arrow', function() {

		var _self = $(this),
				parents = $(this).parents('.service-coast'),
				sublist = $(parents).find('.service-coast__sublist');

		if($(parents).hasClass('open')) {
			$(sublist).slideUp('350', function() {
				$(parents).removeClass('open');
			});
		} else {
			$(sublist).slideDown('350', function() {
				$(parents).addClass('open');
			});
		}
	});


	/* YOUTUBE API*/


	var player;

	function initPlayer() {
		function onYouTubeIframeAPIReady() {
			player = new YT.Player('player', {
				height: '100%',
				width: '100%',
				videoId: 'Y8NS-iBrh_A',
				events: {
						'onReady': onPlayerReady
				}
			});
		}

		function onPlayerReady(event) {
			event.target.playVideo();
		}

		$('.video-preview').on('click', function(event) {
			event.preventDefault();
			onYouTubeIframeAPIReady();

			var that = this;
			$(this).addClass('hidden');
			setTimeout(function() {
					$(that).css('z-index', -1)
			}, 1000)
		});
	}

	initPlayer();

	/* CUSTOM SELECT */

	function formatState (state) {
	  if (!state.id) {
	    return state.text;
	  }
	  if($(state.element).data('status') == 'disabled') {
	    var $state = $('<div class="disabled">' + state.text + '<a href="#subscribe" data-uk-modal="{target: "#subscribe", modal: false}">Подписаться</a>' + '</div>');
	  } else {
	    var $state = $('<div>' + state.text + '!</div>');
	  }

	  return $state;
	};

	$('.js__custom-select').select2({
	  placeholder: "Выберите специалиста",
	  minimumResultsForSearch: -1
	});


});
