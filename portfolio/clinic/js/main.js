'use strict';

$(function() {

	/* MAIN SLIDER PRELOAD */

	$('div.preload').each(function( i, el) {
		if($(el).load()) {
			$(el).addClass('ready');
		};
	});


	/* MAIN SLIDER */


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
			$('.search-form').addClass('uk-animation-fade-in open');
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
		var input = document.querySelector('.search-form input');

		if((e.which == 27 || e.target != input) && $(form).hasClass('open')) {
			$(form).fadeOut('350', function() {
				$(this).removeClass('uk-animation-fade-in open');
				$('.contacts .uk-grid').fadeIn('350');
				$(document).unbind('click keyup', hiddenSearchForm);
			});
		};
	};


	/* SERVICE COAST */

	$('.service-coast').on('click','.service-coast__arrow', function() {

		var _self = $(this),
				parents = $(this).parents('.service-coast'),
				sublist = $(parents).find('.service-coast__sublist');

		if($(parents).hasClass('open')) {
			$(sublist).slideUp('350', function() {
				$(parents).removeClass('open');
			});
			_self.removeClass('open');
		} else {
			$(sublist).slideDown('350', function() {
				$(parents).addClass('open');
			});
			_self.addClass('open');
		}
	});


	/* FILTER DIRECTIONS MOBILE */

	$('.directions-filter__title').on('click', function() {
		var filterWrapper = $(this).parents('.directions-filter'),
				filterList = $(this).siblings('.directions-filter__list');
		if(!filterWrapper.hasClass('open')) {
			filterWrapper.addClass('open');
			filterList
				.stop(true,true)
				.slideDown('350');
		} else {
			filterList
				.stop(true,true)
				.slideUp('350', function() {
					$(this).removeAttr('style');
					filterWrapper.removeClass('open');
				});
		};
	});


	/* YOUTUBE API*/

	var player;

	function initPlayer() {
		function onYouTubeIframeAPIReady(id) {
			player = new YT.Player('player', {
				height: '100%',
				width: '100%',
				videoId: id,
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
			var id = $(this).data('id');
			onYouTubeIframeAPIReady(id);

			var that = this;
			$(this).addClass('hidden');
			setTimeout(function() {
					$(that).css('z-index', -1)
			}, 1000)
		});
	};

	initPlayer();


	/* CUSTOM SELECT */

	$('.js__custom-select').select2({
		placeholder: "Выберите специалиста",
		minimumResultsForSearch: -1
	});


	/* DATEPICKER EVENTS */

	var datepicker = UIkit.datepicker($('.custom-input[data-uk-datepicker]'),{offsettop: 0});

	datepicker.on('show.uk.datepicker', function() {
		$('.custom-input[data-uk-datepicker]').addClass('focused')
	})
	datepicker.on('hide.uk.datepicker', function() {
		$('.custom-input[data-uk-datepicker]').removeClass('focused')
	})


	/* DISABLED UIKIT ANIMATION FOR MOBILE */

	UIkit.on('beforeready.uk.dom', function () {
		if (UIkit.$win.width() < 767 && $('html').hasClass('uk-touch')) {
			UIkit.$('[data-uk-scrollspy]').removeAttr('data-uk-scrollspy');
		}
	});


	/* FORM VALIDATION */

	$('.default-modal form').each(function(i, el) {
		$(el).validate({
				rules: {
					name: {
						required: true
					},
					tel: {
						required: true
					}
				},
				messages: {
					name: "Обязательноe поле",
					tel: "Обязательноe поле"
				},
			});
	});


	/* MASK FORM */

	$('input.js__mask').mask('+7 999 999-99-99', {clearIfNotMatch: true}).focus(function (e) {
		$(this).val('');
	});

});


/* FILTER SORT */

(function() {

	var servicesArray = [],
			lastTime = 0;

	$('.services-list__item').each(function(i, el) {
		servicesArray.push($(el));
	});

	var filterLetterList = $('.services-filter__list a');

	filterLetterList.on('click', function(e) {
		e.preventDefault();

		var _self = $(this).text().toLowerCase();

		filterLetterList.filter(function(i, el) {
			if($(el) != $(this)) {
				$(el).removeClass('active');
			};
		});

		$(this).addClass('active');

		$('.services-list').fadeOut(function() {
			sortList(servicesArray, _self);
		});

		$('.services-list').fadeIn();

	});


	/* DIRECTIONS FILTER */

	var formFilter = ('.js__directions-filter input');

	$(formFilter).on('focus', function() {
		$.each(servicesArray, function(i, el) {
			$(el).removeClass('uk-hidden');
		});
	});

	$(formFilter).on('keyup', function() {
		var value = $(this).val().toLowerCase(),
				valueLength = value.length;

	  if(Date.now() - lastTime >= 800) {

			if(value.length == 0) {
				servicesArray.map(function(el) {
					$(el).removeClass('uk-hidden');
				});
			} else {
				$('.services-list').fadeOut(function() {
					sortList(servicesArray, value);
				});

				$('.services-list').fadeIn();
			};
			lastTime = Date.now();
	  }

	});

	function sortList(arr, value) {
		var val = value,
				valueLength = val.length;
		arr.map(function(el) {
			if(el.data('value').slice(0, valueLength).toLowerCase().toString() != val.toLowerCase().toString()) {
				$(el).addClass('uk-hidden');
			} else {
				$(el).removeClass('uk-hidden');
			}
		});
	};


	/* STAFF FILTER */

	var staffFormFilter = $('.js__staff-filter input'),
			staffArray = [];

	$('.staff-card').each(function(i, el) {
		staffArray.push($(el));
	});

	$(staffFormFilter).on('focus', function() {
		$.each(staffArray, function(i, el) {
			$(el).removeClass('uk-hidden');
		});
	});

	$(staffFormFilter).on('keyup', function() {
		var value = $(this).val().toLowerCase(),
				valueLength = value.length;
		if(Date.now() - lastTime >= 800) {
			if(value.length == 0) {
				staffArray.map(function(el) {
					$(el).removeClass('uk-hidden');
				});
			} else {
				$('.staff-cards-list').fadeOut(function() {
					sortStaffList(staffArray, value);
				});

				$('.staff-cards-list').fadeIn();
			};
			lastTime = Date.now();
		}
	});

	function sortStaffList(arr, value) {
		var val = value,
				valueLength = val.length,
				obj;
		arr.map(function(el) {
			obj = el.data('user');
			if(obj) {
				if(
					obj["name"].slice(0, valueLength).toLowerCase().toString() != val.toLowerCase().toString() &&
					obj["staff"].slice(0, valueLength).toLowerCase().toString() != val.toLowerCase().toString()
					) {
					$(el).addClass('uk-hidden');
				} else {
					$(el).removeClass('uk-hidden');
				}
			} else {
				$(el).addClass('uk-hidden');
			}
		});
	};

})();
