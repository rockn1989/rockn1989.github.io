'use strict';

(function() {

  var templateBtnOpen = document.querySelector('.template-description__btn-open'),
      templateBtnClose = document.querySelector('.template-description__btn-close'),
      templateDescription = document.querySelector('.template-description'),
      templateDescriptionWrapper = document.querySelector('.template-description__wrapper'),
      templateDescriptionBox = document.querySelector('.template-description__box');

  templateBtnOpen.addEventListener('click', showBox);

  function showBox() {
    templateDescription.classList.add('open');
    templateDescription.style.top = window.pageYOffset + 'px';
    document.body.style.overflow = 'hidden';
    this.classList.add('hide');
    templateDescriptionWrapper.classList.add('template-animate__wrapper');
    templateBtnClose.addEventListener('click', hideBox);
    templateDescriptionBox.classList.add('template-animate__box');
  }

  function hideBox() {
    templateDescription.classList.remove('open');
    templateDescriptionWrapper.classList.remove('template-animate__wrapper');
    templateDescriptionBox.classList.remove('template-animate__box');
    templateBtnOpen.classList.remove('hide');
    document.body.style.overflow = 'auto';
    this.removeEventListener('click', hideBox);
  }

})();