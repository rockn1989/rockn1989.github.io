'use strict';

$(function() {

	var browser = navigator.userAgent.match(/IE|Trident/i);



	$('.main-slider').slick({
		arrows: false,
		dots: true,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  fade: false,
	  autoplay: true,
	  autoplaySpeed: 3000,
	  speed: 500,
	  cssEase: 'slideToShow',
	  customPaging: function(slider, i) {
	  	if(browser == null) {
	  		return '<button><svg class="slider__btn"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/icon-svg/sprite-svg.svg#btn-'+(i+1)+'"></use></svg></button>'
	  	} else {
	  		return '<button><img src="img/btn-'+(i+1)+'.svg"></button>';
	  	}

	  }
	});


	/* MASK FORM */

	$('.js__mask').mask('+7 999 999-99-99', {clearIfNotMatch: true}).focus(function (e) {
	  if (!$(this).val()) {
	    $(this).val('+7 ');
	  }
	});


	/* SVG FOR ALL BROWSERS */

	svg4everybody();


	/* GRAPHICKS */

	$.each($('.chart-item'), function( index, value ) {
	  counter($(value).find('.percent'), $(value).find('.percent').html(), 1500);
	});

  function counter(el, maxNumber, time) {
		time = time / parseInt(maxNumber);
		var number = 0;
		var timer;
		var isStart = false;

		if (!isStart) {
		    count(number);
		    isStart = true;
		}

		function count(number) {
		    timer = setTimeout(function () {
		        if (number < parseInt(maxNumber)) {
		            number++;
		            el.text(number + '%');
		            count(number);
		        }
		    }, time);
		};
  };


	/* Отключение анимации на мобильных устройствах */

	UIkit.on('beforeready.uk.dom', function () {
		if (UIkit.$win.width() < 767 && $('html').hasClass('uk-touch')) {
			UIkit.$('[data-uk-scrollspy]').removeAttr('data-uk-scrollspy');
		}
	});

});
