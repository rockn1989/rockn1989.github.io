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


  function menuOpen() {
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
  }

  $(catalogToggle).on('click', menuOpen);



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

(function() {



  var auth = $('a[data-role="auth"]'),
      reg  = $('a[data-role="reg"]');

  $('.main-nav__auth a').on('click', function(e) {
    e.preventDefault();
    if(e.target.getAttribute('data-role') == 'auth') {
      $('.form-auth').addClass('showForm');
      $('.form-reg').removeClass('showForm');
    }
    if(e.target.getAttribute('data-role') == 'reg') {
      $('.form-reg').addClass('showForm');
      $('.form-auth').removeClass('showForm');
    }
  });


  $('.user-form__close').on('click', function() {
    $(this).parent().removeClass('showForm');
  });

  $('#form-auth').on('submit', function(e) {
    e.preventDefault();
    var data = $(this).serialize();
    userForm(data);
  });
/*
  $('#form-reg').on('submit', function(e) {
    e.preventDefault();
    var data = $(this).serialize();
    userForm(data);
  });
*/

  $.validator.addClassRules({
    myForm: {
      required: true,
      digits: true,
      min: 5
    }
  });

  $.validator.addMethod(
    "regex", function(value, elem, regex) {
      var re = new RegExp(regex);
      return this.optional(elem) || re.test(value);
    }, "Не корректное значение"
  );



  $('#form-reg').validate({
   /* highlight: function(elem, errorClass) {
      $(elem).addClass(errorClass);
    },
    unhighlight: function(elem, errorClass) {
      $(elem).removeClass(errorClass);
    },*/
    rules: {
      login: {
        required: true,
        minlength: 3,
        maxlength: 24,
        regex: /^[A-Za-z0-9_]+$/
      },
      pass: {
        required: true,
        minlength: 8,
        maxlength: 40
      },
      email: {
        required: true,
        email: true,
        regex: /^[A-Za-z0-9_]+\@[A-Za-z0-9_]+\.[A-Za-z0-9_]{2,}/
      }
    },

    /*messages: {
      login: {
        required: "Это поле обязательно для заполнения",
        regex: "В имени используются не допустимые символы",
        minlength: "Слишком короткое имя",
        maxlength: "Слишком длинное имя"
      },
      pass: {
        required: "Это поле обязательно для заполнения",
        minlength: "Слишком короткий пароль",
        maxlength: "Слишком длинный пароль"
      },
      email: {
        required: "Это поле обязательно для заполнения",
        email: "Не корректное имя почты. Введите в формате name@domain.ru",
        regex: "Не корректное имя почты. Введите в формате name@domain.ru"
      }
    },*/

    errorElement: "div",
    errorClass: "invalid",
    validClass: "success",
    errorPlacement: function(error) {},
    submitHandler: function(form) {
      form.submit();
    }

  });

  function userForm(data) {
    var userData = data;
    $.ajax({
      type: "POST",
      url: "form.php",
      data: {data: userData},
      dataType: "JSON"
    }).done(function(msg) {
      console.log(msg);
    }).fail(function(e) {
      console.log(e);
    });
  }

})();