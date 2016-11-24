'use strict';

(function() {

  var filterControl = document.querySelector('.our-works__box-control'),
  filterControlLink = filterControl.querySelectorAll('.our-works__links'),
            itemBox = document.querySelector('.our-works__list'),
            items = document.querySelectorAll('.our-works__item'),
            filteredBox = [],
            docFragment = document.createDocumentFragment();

      var itemAll = [];
      for(var g = 0; g < items.length; g++) {
        itemAll.push(items[g].cloneNode(true));
      };

  filterControl.addEventListener('click', function(e) {

    if(e.target.tagName !== 'A') return;

    e.preventDefault();

    for(var i = 0; i< filterControlLink.length; i++) {
      filterControlLink[i].classList.remove('is-active');
    }

    e.target.classList.add('is-active');

    cleanBox(itemBox, filterBox(e.target.id));

    filteredBox.forEach(function(el) {
      docFragment.appendChild(el);
    });

    itemBox.appendChild(docFragment);

  });

  function cleanBox(box, callback) {
    box.innerHTML = '';
    return callback;
  }

  function filterBox(id) {
    filteredBox = [];
    switch(id) {
      case 'work-all': Array.prototype.filter.call(itemAll, (function(el) {
                          var newEl = el.cloneNode(true);
                          filteredBox.push(newEl);
                          return filteredBox;
                        }));
      break;
      case 'work-photo': Array.prototype.filter.call(itemAll, (function(el) {
                            if(el.id == 'photo') {
                              var newEl = el.cloneNode(true);
                              filteredBox.push(newEl);
                            }
                            return filteredBox;
                          }));
      break;
      case 'work-graphic': Array.prototype.filter.call(itemAll, (function(el) {
                            if(el.id == 'graphic') {
                              var newEl = el.cloneNode(true);
                              filteredBox.push(newEl);
                            }
                            return filteredBox;
                          }));
      break;
      case 'work-print': Array.prototype.filter.call(itemAll, (function(el) {
                            if(el.id == 'print') {
                              var newEl = el.cloneNode(true);
                              filteredBox.push(newEl);
                            }
                            return filteredBox;
                          }));
      break;
      case 'work-web': Array.prototype.filter.call(itemAll, (function(el) {
                        if(el.id == 'web') {
                          var newEl = el.cloneNode(true);
                          filteredBox.push(newEl);
                        }
                        return filteredBox;
                      }));
      break;
    }
  }

})();