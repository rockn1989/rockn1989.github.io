'use strict';

(function() {

function Slider(autoplay) {
  var sliderBox = $('.slider-box'),
      sliderBoxContent = $('.slider-box__content'),
      arrowLeft = $('.slider-box__btn.slider-box__btn--left'),
      arrowRight= $('.slider-box__btn.slider-box__btn--right'),
      allSlides = $('.slide'),
      duration = 600,
      autoplayDuration = 5000,
      timestamp = null,
      currentSlide = 0;


  arrowRight.on('click', function() {

    $(arrowLeft).removeClass('slider-box__btn--is-active');
    $(this).addClass('slider-box__btn--is-active');

    $(allSlides[currentSlide]).fadeOut(duration, function() {
      if(currentSlide >= allSlides.length - 1) {
        $(allSlides[currentSlide]).addClass('hideSlide');
        currentSlide = 0;
        $(allSlides[currentSlide]).fadeIn(duration, function() {
          $(this).removeClass('hideSlide');
        });
      } else {
        currentSlide++;
        $(allSlides[currentSlide]).prev().addClass('hideSlide');
        $(allSlides[currentSlide]).fadeIn(duration, function() {
          $(this).removeClass('hideSlide');
        });
      }
    });
  });

  arrowLeft.on('click', function() {
    $(arrowRight).removeClass('slider-box__btn--is-active');
    $(this).addClass('slider-box__btn--is-active');
    $(allSlides[currentSlide]).fadeOut(duration, function() {
      if(currentSlide <= 0) {
        $(allSlides[currentSlide]).addClass('hideSlide');
        currentSlide = allSlides.length - 1;
        $(allSlides[currentSlide]).fadeIn(duration, function() {
          $(this).removeClass('hideSlide');
        });
      } else {
        currentSlide--;
        $(allSlides[currentSlide]).next().addClass('hideSlide');
        $(allSlides[currentSlide]).fadeIn(duration, function() {
          $(this).removeClass('hideSlide');
        });
      }
    });
  });

  function autoPlay() {
    timestamp = setInterval(function() {

      $(arrowLeft).removeClass('slider-box__btn--is-active');
      $(arrowRight).addClass('slider-box__btn--is-active');

      $(allSlides[currentSlide]).fadeOut(duration, function() {
        if(currentSlide >= allSlides.length - 1) {
          $(allSlides[currentSlide]).addClass('hideSlide');
          currentSlide = 0;
          $(allSlides[currentSlide]).fadeIn(duration, function() {
            $(this).removeClass('hideSlide');
          });
        } else {
          currentSlide++;
          $(allSlides[currentSlide]).prev().addClass('hideSlide');
          $(allSlides[currentSlide]).fadeIn(duration, function() {
            $(this).removeClass('hideSlide');
          });
        }
      });

    }, autoplayDuration);
  };

  $(sliderBox)
  .on('mouseover', function() {
    clearInterval(timestamp);
  })
  .on('mouseleave', function() {
    autoPlay();
  });

  if(autoplay) {
    autoPlay();
  }
}

window.Slider= Slider;

})();