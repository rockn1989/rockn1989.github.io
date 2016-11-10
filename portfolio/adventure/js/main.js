'use strict';

(function() {

  function toggleAbilityBox(el) {
    for(var i = 0; i < el.parentNode.children.length; i++) {
      if(el.parentNode.children[i] == el) continue;
      el.parentNode.children[i].classList.remove('is-open');
    }
    el.classList.toggle('is-open');
  }

  window.onload = function() {

    var abilityToggle = document.querySelectorAll('.our-ability__toggle'),
        abilityDesc  = document.querySelectorAll('.our-ability__desc'),
        copyLink = document.querySelectorAll('.our-works__mask-control-links[data-role="copy-link"]');

    Array.prototype.forEach.call(abilityDesc, function(el, i) {
      abilityToggle[i].addEventListener('click', function() {
        toggleAbilityBox(el);
      });
    });


    Array.prototype.forEach.call(copyLink, function(el) {
      new PopupBox(el);
    });

    new Slider(true);

    var platform = window.navigator.userAgent.match(/Android|IPhone|iPad/i);

    if(platform) {
      var copyLink = Array.prototype.filter.call(document.querySelectorAll('.our-works__mask-control-links'), function(el) {
        return !el.getAttribute("data-role");
      });

      var tooltips = document.querySelectorAll('.tooltip');

      Array.prototype.forEach.call(tooltips, function(el) {
        el.classList.add('tooltip-mobile');
      });

      Array.prototype.forEach.call(copyLink, function(el) {
        el.addEventListener('click', function(e) {
          e.preventDefault();
        });
      });
    }
  };

})();