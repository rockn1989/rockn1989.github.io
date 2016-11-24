'use strict';

(function() {

  var filterControl = document.querySelector('.our-works__box-control'),
  filterControlLink = filterControl.querySelectorAll('.our-works__links'),
            itemBox = document.querySelector('.our-works__list'),
            itemAll = itemBox.querySelectorAll('.our-works__item'),
            filteredBox = [],
            docFragment = document.createDocumentFragment();

  filterControl.addEventListener('click', function(e) {

    if(e.target.tagName !== 'A') return;

    e.preventDefault();

    for(var i = 0; i< filterControlLink.length; i++) {
      filterControlLink[i].classList.remove('is-active');
    }

    e.target.classList.add('is-active');

    cleanBox(itemBox, filterBox(e.target.id));

    filteredBox.forEach(function(el,i) {
      docFragment.appendChild(el);
    });

    itemBox.appendChild(docFragment);

  });

  function cleanBox(box, callback) {
    box.innerHTML = '';
    callback;
  }

  function filterBox(id) {
    switch(id) {
      case 'work-all': filteredBox = Array.prototype.filter.call(itemAll, (function(el) {
        return el;
      }));
      break;
      case 'work-photo': filteredBox = Array.prototype.filter.call(itemAll, (function(el) {
        return el.id == 'photo';
      }));
      break;
      case 'work-graphic': filteredBox = Array.prototype.filter.call(itemAll, (function(el) {
        return el.id == 'graphic';
      }));
      break;
      case 'work-print': filteredBox = Array.prototype.filter.call(itemAll, (function(el) {
        return el.id == 'print';
      }));
      break;
      case 'work-web': filteredBox = Array.prototype.filter.call(itemAll, (function(el) {
        return el.id == 'web';
      }));
      break;
    }
  }

})();