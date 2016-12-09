'use strict';

(function() {

  var menuToggle = $('.main-nav__menu-icon'),
      menu       = $('.main-nav__list');

  if(menu) {
    $(menu).removeClass('open-menu');
  }

  $(menuToggle).on('click', function() {
    if(!$(menu).hasClass('open-menu')) {
      $(menu).slideDown('faster', function() {
        $(this).addClass('open-menu');
      });
    } else {
      $(menu).slideUp('faster', function() {
        $(this).removeClass('open-menu')
        $(this).removeAttr('style');
      });

    }
  });


  var menuCatalog = $('.catalog__list'),
      catalogToggle = $('.catalog__header'),
      catalogItemCounter = catalogToggle.find($('.catalog__counter-item')),
      menuItem = menuCatalog.find('li.catalog__item'),
      menuLink = menuCatalog.find('a.catalog__link');

  catalogItemCounter.text(menuItem.length);

  if(catalogToggle) {
    $(menuCatalog).removeClass('open-catalog');
  }

  $(catalogToggle).on('click', function() {
    if($(window).width() >= 750) {
     return false;
   } else {
      if(!$(menuCatalog).hasClass('open-catalog')) {
        $(menuCatalog).slideDown('faster', function() {
          $(this).addClass('open-catalog');
        });
      } else {
        $(menuCatalog).slideUp('faster', function() {
          $(this).removeClass('open-catalog')
          $(this).removeAttr('style');
        });

      }
    }
  });



  var allItem = $('ul.catalog__list li');
  var allLink = $('ul.catalog__list a');
  var allLists = $('ul.catalog__sub-list');

  menuCatalog.on('click', function(e) {

    if(e.target.tagName != 'A') return;

    if(e.target.getAttribute('data-role') == 'level-1' || e.target.getAttribute('data-role') == 'level-2') e.preventDefault();

    if(e.target.getAttribute('data-role') == 'level-1' && !$(e.target).hasClass('link-open')) {

      allLink.removeClass('link-open sub-link-open').removeAttr('style');
      allItem.removeClass('item-open sub-item-open').removeAttr('style');
      allLists.stop(true).slideUp('faster', function() {
        $(this).removeAttr('style');
      });

      $(e.target).addClass('link-open');
      $(e.target).parent().addClass('item-open');
      $(e.target).parent().find('ul.catalog__sub-list[data-role="level-1"]').stop(true).slideDown('faster');
    } else {
      $(e.target).removeClass('link-open');
      $(e.target).parent().removeClass('item-open');
      $(e.target).parent().find('ul.catalog__sub-list[data-role="level-1"]').stop(true).slideUp('faster');
    }

    if(e.target.getAttribute('data-role') == 'level-2' && !$(e.target).hasClass('sub-link-open')) {

      $(allLink).filter('[data-role="level-2"]').removeClass('sub-link-open');
      $(allLink).filter('[data-role="level-2"]').parent().removeClass('sub-item-open');
      $(allLists).filter('ul.catalog__sub-list[data-role="level-2"]').stop(true).slideUp('faster');

      $(e.target).addClass('sub-link-open');
      $(e.target).parent().addClass('sub-item-open');
      $(e.target).parent().find('ul.catalog__sub-list[data-role="level-2"]').stop(true).slideDown('faster');
    }else {
        $(e.target).removeClass('sub-link-open');
        $(e.target).parent().removeClass('sub-item-open');
        $(e.target).parent().find('ul.catalog__sub-list[data-role="level-2"]').stop(true).slideUp('faster');
    }

  });

})();


(function() {
  $(document).ready(function(){

    $('.slider-box').slick({
      dots: true,
      arrows: false,
      infinity: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1
    });

    $('.slider-content').slick({
      arrow: true,
      dots: false,
      infinity: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 2,
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
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });

  });

})();

