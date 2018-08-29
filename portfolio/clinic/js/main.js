'use strict';

/* FIX FOR SELECT2 */

(function($) {

	var Defaults = $.fn.select2.amd.require('select2/defaults');

	$.extend(Defaults.defaults, {
		dropdownPosition: 'auto'
	});

	var AttachBody = $.fn.select2.amd.require('select2/dropdown/attachBody');

	var _positionDropdown = AttachBody.prototype._positionDropdown;

	AttachBody.prototype._positionDropdown = function() {

		var $window = $(window);

		var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
		var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');

		var newDirection = null;

		var offset = this.$container.offset();

		offset.bottom = offset.top + this.$container.outerHeight(false);

		var container = {
				height: this.$container.outerHeight(false)
		};

		container.top = offset.top;
		container.bottom = offset.top + container.height;

		var dropdown = {
			height: this.$dropdown.outerHeight(false)
		};

		var viewport = {
			top: $window.scrollTop(),
			bottom: $window.scrollTop() + $window.height()
		};

		var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
		var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);

		var css = {
			left: offset.left,
			top: container.bottom
		};

		// Determine what the parent element is to use for calciulating the offset
		var $offsetParent = this.$dropdownParent;

		// For statically positoned elements, we need to get the element
		// that is determining the offset
		if ($offsetParent.css('position') === 'static') {
			$offsetParent = $offsetParent.offsetParent();
		}

		var parentOffset = $offsetParent.offset();

		css.top -= parentOffset.top
		css.left -= parentOffset.left;

		var dropdownPositionOption = this.options.get('dropdownPosition');

		if (dropdownPositionOption === 'above' || dropdownPositionOption === 'below') {
			newDirection = dropdownPositionOption;
		} else {

			if (!isCurrentlyAbove && !isCurrentlyBelow) {
				newDirection = 'below';
			}

			if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
				newDirection = 'above';
			} else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
				newDirection = 'below';
			}

		}

		if (newDirection == 'above' ||
		(isCurrentlyAbove && newDirection !== 'below')) {
				css.top = container.top - parentOffset.top - dropdown.height;
		}

		if (newDirection != null) {
			this.$dropdown
				.removeClass('select2-dropdown--below select2-dropdown--above')
				.addClass('select2-dropdown--' + newDirection);
			this.$container
				.removeClass('select2-container--below select2-container--above')
				.addClass('select2-container--' + newDirection);
		}

		this.$dropdownContainer.css(css);

	};

})(window.jQuery);


/*_____ SITE CODE _____*/

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
				template.removeClass('visible');
				$('.contacts .uk-grid').fadeIn('350');
				$(document).unbind('click keyup', hiddenSearchForm);
			});
		};
	};

	/* AUTOCOMPLETE */

	var result = [
	{"value":"Массажист","url":"/doctors-detail.html"},
	{"value":"Уролог","url":"/doctors-detail.html"},
	{"value":"Узи","url":"/doctors-detail.html"},
	{"value":"Косметолог","url":"/doctors-detail.html"},
	{"value":"Педиатр","url":"/doctors-detail.html"},
	{"value":"Онколог","url":"/doctors-detail.html"},
	{"value":"Психотерапевт","url":"/doctors-detail.html"}
];


	$('.search-form input').on('keyup', autocomplete);

	var template = $('.autocomplete');

	var relativeBlock = $('.contacts');

	function autocomplete() {
		var value = $(this).val().toLowerCase();
		template.find('ul').html('');
		if(value.length !== 0) {
			$.each(result, function(i, el) {
				if(el.value.toLowerCase().indexOf(value) !== -1 && el.value.toLowerCase().indexOf(value) == 0) {
					$('.search-form').addClass('find');
					template.addClass('visible');
					var result = '<li><a href="' + el.url + '">' + el.value + '</a></li>'
					template.find('ul').append(result);
				}
			});
		} else {
			template.removeClass('visible');
			$('.search-form').removeClass('find');
		}

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


	$('.uk-modal').on('show.uk.modal', function() {
		var width = $(this).find('input[type="text"]').outerWidth();
		$('.js__custom-select').select2({
			placeholder: "Выберите специалиста",
			minimumResultsForSearch: -1,
			dropdownPosition: 'below',
			width: width+'px'
		});
	});

	$('.js__reviews-select').select2({
		minimumResultsForSearch: -1,
		dropdownPosition: 'below'
	});


	$('.reviews-form-reset ').on('click', function (e) {
		e.preventDefault();
		$('.js__reviews-select').val([]).trigger('change');
	});

	var template = document.querySelector('#reviews').content.cloneNode(true)
	var $reviewsWrapper = $('.reviews-list');


	$('.upload-more').on('inview.uk.scrollspy', function() {
		var _self = $(this);
			setTimeout(function () {
				$reviewsWrapper.append(template);
				_self.removeClass('load uk-scrollspy-init-inview uk-scrollspy-inview');
				_self.on('outview.uk.scrollspy', function () {
				});
			}, 2000);
			
	});


	/* MODAL FORM RADIO-BUTTON CHANGE */

	$('.uk-modal').on('show.uk.modal', function() {
		var btnValue = $('.review-add-comments').attr('data-val'),
			$radioWrapper = $(this).find('.radio-wrapper');

		if (btnValue == 'radio-doctor') {
			$(this).find('.review-clinic').css('display','none');
			$radioWrapper.find('input#radio-doctor').attr('checked', 'true')
		};

		if (btnValue == 'radio-clinic') {
			$(this).find('.review-doctor').css('display','none')
			$radioWrapper.find('input#radio-clinic').attr('checked', 'true')
		};
		
	});

	$('.radio-wrapper').on('change','input[type="radio"]', function () {

		$('.radio-value-fields').addClass('change');

		if($(this).attr('id') == 'radio-clinic') {
			$('.radio-value-fields').find('.review-doctor').fadeOut('350',function () {
				$('.review-clinic').fadeIn('350', function () {
					$('.js__custom-select').val([]).trigger('change');
					$('.review-doctor').find('textarea').val('');
					$('.radio-value-fields').removeClass('change');
				});
			});
		};

		if($(this).attr('id') == 'radio-doctor') {

			$('.radio-value-fields').find('.review-clinic').fadeOut('350',function () {
				$('.review-doctor').fadeIn('350', function () {
					$('.review-clinic').find('textarea').val('');
					$('.radio-value-fields').removeClass('change');
				});
			});
		};

	});


	/* DATEPICKER EVENTS */

	var datepicker = UIkit.datepicker($('.custom-input[data-uk-datepicker]'),{offsettop: 0});

	datepicker.on('show.uk.datepicker', function() {
		var width = $('.custom-input[data-uk-datepicker]').outerWidth();
		$('.uk-dropdown.uk-datepicker').css({'width': width + 'px'});
		$('.custom-input[data-uk-datepicker]').addClass('focused');
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
