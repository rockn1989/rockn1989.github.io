'use strict';

(function() {

  var  templatePopup = document.querySelector('#popupbox'),
       elementToClone = (templatePopup.content || templatePopup).querySelector('.popupbox');

  /**
  * @typeofdef {Object} PopupBox
  * Объект всплывающего окна
  * @property {HTMLElement}
  */
  function PopupBox(data) {
    var self = this;

    this.element = data;

    this.popupbox = elementToClone.cloneNode(true);
    this.popupboxInput = this.popupbox.querySelector('.popupbox__input');
    this.popupboxBtn = this.popupbox.querySelector('.popupbox__btn');

    this.open = this.open.bind(this);
    this.setLinkBuffer = this.setLinkBuffer.bind(this);

    this.element.addEventListener('click', this.open);
    this.popupboxBtn.addEventListener('click', this.setLinkBuffer);
    this.popupbox.addEventListener('mouseleave', this.hide);
  };

  /**
  * Откртие всплывающего окна
  *
  */
  PopupBox.prototype.open = function(e) {
    e.preventDefault();

    try {
      if(document.querySelector('.popupbox')) {
        document.body.removeChild(document.querySelector('.popupbox.popupbox-show'));
        console.log(this.time);
        clearInterval(this.time);
      }
    } catch(err) {
       var err = 'Some error in IE. Text error : ' + err;
    }

    document.body.appendChild(this.popupbox);

    this.popupbox.classList.add('popupbox-show');
    this.popupboxBtn.classList.remove('copy');
    this.popupboxBtn.classList.remove('copyError');
    this.popupboxBtn.innerText = 'Copy Link';

    this.getCoord(this.element);
    this.setLink();
  }

  /**
  * Закрытие всплывающего окна
  */
  PopupBox.prototype.hide = function() {
    document.body.removeChild(this);
  }

  /**
  * Записывает адрес ссылки в input
  */
  PopupBox.prototype.setLink = function() {
    this.popupboxInput.value = this.element.getAttribute('href');
    this.popupboxInput.select();
  }

  /**
  * Сохраняет адрес ссылки в буфер обмена пользователя
  */
  PopupBox.prototype.setLinkBuffer = function() {
    this.popupboxBtn.disabled = !document.queryCommandSupported('copy');
    try {
      document.execCommand('copy', false, this.popupboxInput.select());
      this.popupboxBtn.innerText = 'Copy';
      this.popupboxBtn.classList.add('copy');
    } catch(err) {
      this.popupboxBtn.innerText = 'Try Again';
      this.popupboxBtn.classList.add('copyError');
    }
  }

  /**
  * Позиционирует всплывающее окно рядом с ссылкой
  * @param {HTMLElement}
  */
  PopupBox.prototype.getCoord = function(el) {

    this.coords = el.getBoundingClientRect();

    if(this.coords.top < this.popupbox.offsetHeight) {
      this.popupbox.style.top = this.coords.bottom + window.pageYOffset + 'px';
    } else {
      this.popupbox.style.top = this.coords.top + window.pageYOffset - this.popupbox.offsetHeight + 'px';
    }

    if(this.popupbox.offsetParent.clientWidth - this.coords.right < this.popupbox.offsetWidth) {
      this.popupbox.style.left = this.coords.left - this.popupbox.offsetWidth + window.pageXOffset + 'px';
    } else {
      this.popupbox.style.left = this.coords.left + el.offsetWidth + window.pageXOffset + 'px';
    }

  }

  window.PopupBox = PopupBox;

})();