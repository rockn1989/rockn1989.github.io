'use strict';

(function() {

  var filterControl = document.querySelector('.our-works__box-control'),
  filterControlLink = filterControl.querySelectorAll('.our-works__links'),
            itemBox = document.querySelector('.our-works__list'),
            items = document.querySelectorAll('.our-works__item'),
            itemCopy = [],
            filteredBox = [],
            docFragment = document.createDocumentFragment();

  for(var g = 0; g < items.length; g++) {
    itemCopy.push(items[g].cloneNode(true));
  };

  filterControl.addEventListener('click', function(e) {

    if(e.target.tagName !== 'A') return;

    e.preventDefault();

    for(var i = 0; i< filterControlLink.length; i++) {
      filterControlLink[i].classList.remove('is-active');
    }

    e.target.classList.add('is-active');

    cleanBox(itemBox, function() {
      filterBox(e.target.id);
    });

    filteredBox.forEach(function(el) {
      docFragment.appendChild(el);
    });

    itemBox.appendChild(docFragment);

  });

  function cleanBox(box, callback) {
    box.innerHTML = '';
    callback();
  }

  function filterBox(id) {
    filteredBox = [];
    switch(id) {
      case 'work-all': Array.prototype.forEach.call(itemCopy, (function(el) {
                          var newEl = el.cloneNode(true);
                          filteredBox.push(newEl);
                          return filteredBox;
                        }));
      break;
      case 'work-photo': Array.prototype.forEach.call(itemCopy, (function(el) {
                            if(el.id == 'photo') {
                              var newEl = el.cloneNode(true);
                              filteredBox.push(newEl);
                            }
                            return filteredBox;
                          }));
      break;
      case 'work-graphic': Array.prototype.forEach.call(itemCopy, (function(el) {
                            if(el.id == 'graphic') {
                              var newEl = el.cloneNode(true);
                              filteredBox.push(newEl);
                            }
                            return filteredBox;
                          }));
      break;
      case 'work-print': Array.prototype.forEach.call(itemCopy, (function(el) {
                            if(el.id == 'print') {
                              var newEl = el.cloneNode(true);
                              filteredBox.push(newEl);
                            }
                            return filteredBox;
                          }));
      break;
      case 'work-web': Array.prototype.forEach.call(itemCopy, (function(el) {
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