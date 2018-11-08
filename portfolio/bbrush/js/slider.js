$(function () {

	var $currentsSlides = $('.counter__current-slide'),
		$allSlides = $('.counter__all-slides'),
		$detailSlider = $('.detail-slider .slider'),
		$detailSlide = '';
		$progressBar = $('.progress-bar__load'),
		playSpeed = 12000;

		$.each($('.detail-slider .slider img'), function (i, el) {
			el.style.animationDuration = playSpeed/1000+'s';
		});

	/*______ Инициализацяи слайдера ______*/

	$detailSlider.on('init', function (event, slick) {
		$allSlides.text(slick.slideCount);
		$currentsSlides.text(1);
		$detailSlide = $detailSlider.find('.slide.slick-current');
		$detailSlide.addClass('imgPlay');

		console.log($detailSlide.find('img'));
		$progressBar.animate({
			width: '100%'
			},
			playSpeed);
	});

	/*______ Оставновка/запуск прогресс-бара по наведению мыши ______*/

	$('.detail-slider .slider').on('mouseenter', function () {
		$progressBar.stop();
		$detailSlide.addClass('pause');
	});

	$('.detail-slider .slider').on('mouseleave', function () {
		$detailSlide.removeClass('pause');
		$progressBar.animate({
			width: '100%'
			},
			playSpeed);
	});


	/*______ Настройки слайдера ______*/

	$detailSlider.slick({
		arrows: true,
		dots: false,
		infinity: true,
		cssEase: 'linear',
		autoplay: true,
		fade: true,
		autoplaySpeed: playSpeed,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true,
		prevArrow: $(this).find('.slide-prev'),
		nextArrow: $(this).find('.slide-next'),
		responsive: [
			{
				breakpoint: 1025,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					adaptiveHeight: true
				}
			},
			{
				breakpoint: 940,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					adaptiveHeight: false
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					adaptiveHeight: false
				}
			}
		]
	}).on('afterChange', function(event, slick, currentSlide, nextSlide) {
		$detailSlide = $detailSlider.find('.slide.slick-current');
		$detailSlide.addClass('imgPlay');
		$currentsSlides.text(currentSlide + 1);
		$progressBar.stop(true, true);
		$progressBar.removeAttr('style');
		$progressBar.animate({
			width: '100%'
			},
			playSpeed);
	}).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		$detailSlide = $detailSlider.find('.slide.slick-current');
		$detailSlide.removeClass('imgPlay');
	});


	/*______ Business patners slider  ______*/

	$('.business-patners-slider .slider').slick({
		arrows: true,
		dots: false,
		infinity: true,
		cssEase: 'linear',
		autoplay: true,
		fade: false,
		autoplaySpeed: 3000,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1,
		adaptiveHeight: true,
		prevArrow: '<div class="btn-slide slick-prev"><i class="icon-arrow-left"></i></div>',
		nextArrow: '<div class="btn-slide slick-next"><i class="icon-arrow-right"></i></div>',
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
					slidesToShow: 3,
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
	})


});
