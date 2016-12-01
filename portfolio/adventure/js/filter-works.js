'use strict';

(function() {

  var filterControl = document.querySelector('.our-works__box-control'),
  filterControlLink = filterControl.querySelectorAll('.our-works__links'),
            itemBox = document.querySelector('.our-works__list'),
            items = document.querySelectorAll('.our-works__item');


  filterControl.addEventListener('click', function(e) {

    if(e.target.tagName !== 'A') return;

    e.preventDefault();

    var id = e.target.getAttribute('data-role'),
      docFragment = document.createDocumentFragment(),
      filteredBox = [];

    for(var i = 0; i< filterControlLink.length; i++) {
      filterControlLink[i].classList.remove('is-active');
    }

    e.target.classList.add('is-active');

    cleanBox(itemBox);
    filteredBox = filterBox(id);

    filteredBox.forEach(function(el) {
      var copyLink = el.querySelector('a[data-role="copy-link"]');
      new PopupBox(copyLink);
      docFragment.appendChild(el);
    });

    itemBox.appendChild(docFragment);

  });

  function cleanBox(box) {
    if(document.querySelector('.popupbox')) {
      document.body.removeChild(document.querySelector('.popupbox.popupbox-show'));
    }
    while(box.children.length > 0) {
      box.removeChild(box.firstElementChild);
    }
  }

  function filterBox(id) {

    var filters = {
      'work-all': function() { return true; },
      'work-photo': function(el) { return el.getAttribute('data-role') === 'photo'},
      'work-graphic': function(el) { return el.getAttribute('data-role') === 'graphic'},
      'work-print': function(el) { return el.getAttribute('data-role') === 'print'},
      'work-web': function(el) { return el.getAttribute('data-role') === 'web'}
    };

   var filterFunction = filters[id] || filters['work-all'];

   return Array.prototype.filter.call(items, filterFunction).map(function(el) {
                  return el.cloneNode(true);
                });
  }

})();