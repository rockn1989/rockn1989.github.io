
(function() {

  var menuNav = document.querySelector(".main-nav"),
      openMenu = document.querySelector(".main-nav__open-menu");

  if(menuNav) {
    menuNav.classList.remove("main-nav--open");
    menuNav.classList.remove("main-nav--no-js");
  }


  function menuToggle(e) {

    e.preventDefault();

    menuNav.classList.toggle("main-nav--open");

  }

  openMenu.addEventListener("click", menuToggle);

})();

