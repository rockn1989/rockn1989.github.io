'use strict';

$(function() {

	/*______ Слайдер на главной ______*/

	$('.main-slider .slider').slick({
		slidesToShow: 1,
		fade: true,
		autoplay: true,
		autoplayspeed: 500,
		arrows: false
	});


	$('.about-company-slider .slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		fade: false,
		autoplay: true,
		autoplayspeed: 500,
		arrows: true,
		prevArrow: '<div class="btn-slide slick-prev"><i class="icon-arrow-left"></i></div>',
		nextArrow: '<div class="btn-slide slick-next"><i class="icon-arrow-right"></i></div>',
		responsive: [
			{
				breakpoint: 1025,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
				}
			},
			{
				breakpoint: 940,
				settings: {
					slidesToShow: 2,
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



	/*______ Показывать выпадающее меню в верхней навигации ______*/

	$('.catalog-nav-menu').on('click', function (e) {
		e.preventDefault()
	});


	/*______ Показывать форму на мобильных устройствах ______*/

	var $mobileForm = $('.mobile-form');

	$('.js__show-form').on('click', function (e) {
		e.preventDefault();
		$mobileForm.slideToggle('350').find('input').focus();
	})


	/*______ Маска формы ______*/

	$('.js__input-phone').mask('+7 999 999-99-99', {clearIfNotMatch: true}).focus(function (e) {
		if (!$(this).val()) {
			$(this).val('+7 ');
		}
	});


	/*______ Валидация формы ______*/

	if($('form').is('.callback-form')) {

		$('.callback-form').validate({
			messages: {
				["callback-name"]: "Обязательноe поле",
				["callback-tel"]: "Обязательноe поле"
			},
		});
	};


	/*______ Открытие мобильного подменю ______*/

	$('.mobile-catalog-services').on('click','i', function (e) {
		e.preventDefault();
		var self = $(this),
			blockParent = self.parent('a'),
			siblingsList = blockParent.siblings('ul');

		if(blockParent.hasClass('open')) {
			siblingsList.stop().slideUp('350');
			blockParent.removeClass('open');
		} else {
			siblingsList.stop().slideDown('350');
			blockParent.addClass('open');
		}

		self.toggleClass('open');
	});


	/*______ Открытие мобильного подменю в футере ______*/

	$('[data-role="toggle-list"] i').on('click', function (e) {
		e.preventDefault();
		var self = $(this),
			blockParent = self.parent('[data-role="toggle-list"]'),
			siblingsList = blockParent.parent().find('.footer__list');

		self.toggleClass('open');
		siblingsList.stop().slideToggle('350');
	});


	/*______ Отключение UIKIT анимации для мобильных устройств ______*/

	UIkit.on('beforeready.uk.dom', function () {
		if (UIkit.$win.width() < 767 && $('html').hasClass('uk-touch')) {
			UIkit.$('[data-uk-scrollspy]').removeAttr('data-uk-scrollspy');
		};
	});


	/*______ Полифил для Object-fit ______*/
	
	objectFitImages();


	/*______ Полифил для SVG ______*/

	//svg4everebody();


	/*______ Google Map ______*/

	function initMap() {
				var myLatLng = {lat: -25.363, lng: 131.044};

				// Create a map object and specify the DOM element
				// for display.
				var map = new google.maps.Map(document.getElementById('map'), {
					center: myLatLng,
					zoom: 4
				});

				// Create a marker and set its position.
				var marker = new google.maps.Marker({
					map: map,
					position: myLatLng,
					title: 'Hello World!'
				});
			};
	//initMap();
});




$(function ($) {
	var $courseNav = $('.courses-nav'),
		$courseNavList = $('.courses-nav li'),
		$coursesWrapper = $('.courses-list'),
		$coursesList = $('.courses-list__item');

	$courseNav.on('click', 'a', function (e) {
		e.preventDefault();

		$.each($courseNavList, function (i, el) {
			$(el).removeClass('active');
		});

		$(this).parent('li').addClass('active');

		filterList($(this).data('age'));
	});

	function filterList(value) {
		var val = value;

		if(val != 100) {
			$coursesWrapper.fadeOut('350', function() {
				$coursesList.filter(function (i, el) {
					$(el).data('age') == val ? $(el).removeClass('uk-hidden') : $(el).addClass('uk-hidden');
				});
				$(this).fadeIn('350');
			});

		} else {
			$coursesWrapper.fadeOut('350', function() {
				$.each($coursesList, function (i, el) {
					$(el).removeClass('uk-hidden');
				});
				$(this).fadeIn('350');
			});

		}

	};

});
