'use strict';

$.validator.setDefaults({ ignore: '' });

$(function() {

	/*______ Slider ______*/

	$('.system-slider .slider').slick({
		arrows: false,
		dots: true,
		fade: true,
		autoplay: false
	});

	var $currentsSlides = $('.counter__current-slide'),
		$allSlides = $('.counter__all-slides'),
		$appSlider = $('.application-slider .slider');

	$appSlider.on('init', function (event, slick) {
		$allSlides.text(slick.slideCount);
		$currentsSlides.text(1);
	});

	$('.application-slider .slider').slick({
		arrows: true,
		dots: false,
		fade: true,
		autoplay: true,
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
					slidesToScroll: 1,
					arrows: false,
					dots: true
				}
			}
		]
	}).on('afterChange', function(event, slick, currentSlide, nextSlide) {
		$currentsSlides.text(currentSlide + 1);
	});


	/*______ Маска формы ______*/

	$('.js__input-mask').mask('+7 999 999-99-99', {clearIfNotMatch: true}).focus(function (e) {
		if (!$(this).val()) {
			$(this).val('+7 ');
		}
	});

	/*______ Select2 ______*/

	$('.custom-select').select2({
		placeholder: "Тип газа",
		miltiple: true
	});

	
	/*______ Валидация формы ______*/

	if($('form').is('.question-form')) {

		$('.question-form').validate({
			rules: {
				["question-user-tel"]: {
					required: true,
				}
			},
			messages: {
				["question-user-tel"]: "Обязательноe поле",
				["question-politics"]: "Для отправки формы необходимо дать согласие на обработку персональных данных",
			},
		});
	};


	if($('form').is('.feedback-form')) {

		$('.feedback-form').validate({
			rules: {
				politics: {
					required: true,
				},
				tel: {
					required: true,
				}
			},
			messages: {
				tel: "Обязательноe поле",
				["feedback-politics"]: "Для отправки формы необходимо дать согласие на обработку персональных данных",
			}
		});
	};
	
	if($('form').is('.consultation-form')) {

		$('.consultation-form').validate({
			rules: {
				politics: {
					required: true,
				},
				tel: {
					required: true,
				}
			},
			messages: {
				tel: "Обязательноe поле",
				["consultation-politics"]: "Для отправки формы необходимо дать согласие на обработку персональных данных",
			}
		});
	};
	/*______ JS custom checkbox ______*/

	var $checkboxToggle = $('.js__toggle-checkbox');

	$.each($checkboxToggle, function (i, el) {
		$(el).on('click', function (e) {
			var checkbox = $(this).find('input[type="checkbox"]'),
					customCheckBox = $(this).find('.custom-checkbox');

			checkbox.is(':checked') ? customCheckBox.addClass('checked') : customCheckBox.removeClass('checked')
		});
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

	svg4everybody();

});
