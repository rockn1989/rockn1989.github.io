'use strict';

(function() {

  var templateBtnOpen = document.querySelector('.template-description__btn-open'),
      templateBtnClose = document.querySelector('.template-description__btn-close'),
      templateDescription = document.querySelector('.template-description');

  templateBtnOpen.addEventListener('click', showBox);

  function showBox() {
    templateDescription.classList.add('open');
    templateDescription.style.top = window.pageYOffset + 'px';
    document.body.style.overflow = 'hidden';
    this.classList.add('hide');
    templateBtnClose.addEventListener('click', hideBox);
  }

  function hideBox() {
    templateDescription.classList.remove('open');
    templateBtnOpen.classList.remove('hide');
    document.body.style.overflow = 'auto';
    this.removeEventListener('click', hideBox);
  }

})();