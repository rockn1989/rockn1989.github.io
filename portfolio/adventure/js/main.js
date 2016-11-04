'use strict';

(function() {

  window.onload = function() {

    var abilityToggle = document.querySelectorAll('.our-ability__toggle'),
        abilityDesc  = document.querySelectorAll('.our-ability__desc'),
        copyLink = document.querySelectorAll('.our-works__mask-control-links[data-role="copy-link"]');

    Array.prototype.forEach.call(abilityDesc, function(el, i) {
      abilityToggle[i].addEventListener('click', function() {
        toggleAbilityBox(el);
      });
    });

    function toggleAbilityBox(el) {
      for(var i = 0; i < el.parentNode.children.length; i++) {
        if(el.parentNode.children[i] == el) continue;
        el.parentNode.children[i].classList.remove('is-open');
      }
      el.classList.toggle('is-open');
    }

    Array.prototype.forEach.call(copyLink, function(el) {
      new PopupBox(el);
    });

    new Slider(true);

  };
})();