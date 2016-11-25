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

    var id = e.target.getAttribute('data-role');

    for(var i = 0; i< filterControlLink.length; i++) {
      filterControlLink[i].classList.remove('is-active');
    }

    e.target.classList.add('is-active');

    cleanBox(itemBox, function() {
      filteredBox = filterBox(id);
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

    var filters = {
      'work-all': function() { return true; },
      'work-photo': function(el) { return el.id === 'photo'},
      'work-graphic': function(el) { return el.id === 'graphic'},
      'work-print': function(el) { return el.id === 'print'},
      'work-web': function(el) { return el.id === 'web'}
    };

   var filterFunction = filters[id] || filters['work-all'];

   return Array.prototype.filter.call(itemCopy, filterFunction).map(function(el) {
                  return el.cloneNode(true);
                });
  }

})();