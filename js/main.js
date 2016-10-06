'use strict';

(function() {

  var mainNav = document.querySelector('.main-nav'),
      openNav = document.querySelector('.main-nav__toggle-menu');

  if(mainNav) {
    mainNav.classList.remove("main-nav--open");
    mainNav.classList.remove("main-nav--no-js");
    mainNav.classList.add("main-nav--close");
  }

  openNav.addEventListener('click', menuToggle);

  function menuToggle() {
    mainNav.classList.toggle('main-nav--open');
    mainNav.classList.toggle('main-nav--close');
  }

})();
