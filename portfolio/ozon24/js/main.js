'use strict';

$(function() {

$('.main-slider').slick({
	arrows: false,
	dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: false,
  cssEase: 'slideToShow',
  customPaging: function(slider, i) {
  	return '<button><svg class="callback__icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://rockn1989.github.io/portfolio/ozon24/img/icon-svg/sprite-svg.svg#btn-'+(i+1)+'"></use></svg></button>'
  }
});


});
