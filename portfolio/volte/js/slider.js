/**
 * Slider
 */

(function () {
  const VoLTe = window?.VoLTe || {};

  class Slider {
    constructor(className) {
      this.slider = document.querySelector(className || ".slider");
      this.sliderBox = this.slider.querySelector(".slider__inner");
      this.slides = this.slider.querySelectorAll(".slide");
      this.currentSlide = this.slider.querySelector(".slide-current");
      this.currentImgBox = this.slider.querySelector(".slider__current-img");
      this.currentImg = this.currentSlide.querySelector("img");
      this.arrow = this.slider.querySelector(".slider__arrow");
      this.dotsBox = this.slider.querySelector(".slider__dots");
      this.dots = this.slider.querySelectorAll(".slider__dots li");

      this.currentSlideIdx = 0;
      this.isToggle = true;
      this.toggleSlides = this.toggleSlides.bind(this);
      this.dotsToggleSlide = this.dotsToggleSlide.bind(this);
    }

    onHandleCheckActiveSlide() {
      this.slider.addEventListener("click", (evt) => {
        let evtTarget = evt.target.closest(".slide");
        if (evtTarget && !evtTarget.classList.contains("slide-current")) {
          [...this.slides].forEach((slide) =>
            slide.classList.remove("slide-current")
          );
          evtTarget.classList.add("slide-current");
          this.currentImg = evtTarget.querySelector("img");
          this.onHandleChangeCurrentImg(this.currentImg);
        }
      });
    }

    init() {
      this.onHandleSetCurrentImg();
      this.onHandleCheckActiveSlide();
      this.onHandleToggleSlides();
      this.onHandleDotsCheckSlides();
    }

    onHandleSetCurrentImg() {
      this.currentImgBox.style.backgroundImage = `url(${this.currentImg.src})`;
    }

    onHandleChangeCurrentImg(img) {
      this.currentImgBox.classList.add("fadeIn");
      const newImg = new Image();
      newImg.src = img.src;
      newImg.addEventListener("load", () => {
        this.currentImgBox.addEventListener("transitionend", () => {
          this.currentImgBox.style.backgroundImage = `url(${newImg.src})`;
          this.currentImgBox.classList.remove("fadeIn");
          this.isToggle = true;
        });
      });
    }

    onHandleToggleSlides() {
      if (window.matchMedia("(min-width: 768px)").matches) {
        this.arrow.addEventListener("click", this.toggleSlides);
      } else {
        this.arrow.addEventListener("click", this.dotsToggleSlide);
      }
    }

    onHandleDotsCheckSlides() {
      this.dotsBox.addEventListener("click", this.dotsToggleSlide);
    }

    dotsToggleSlide(evt) {
      evt.preventDefault();

      if (!evt.target.closest("li")) {
        [...this.dots].forEach((btn, idx) => {
          if (btn.classList.contains("active")) {
            if (idx === this.dots.length - 1) {
              this.currentSlideIdx = 0;
            } else {
              this.currentSlideIdx = idx + 1;
            }

            btn.classList.remove("active");
          }
        });

        this.dots[this.currentSlideIdx].classList.add("active");
      } else {
        let evtTarget = evt.target.closest("li");

        if (evtTarget && !evtTarget.classList.contains("active")) {
          [...this.dots].forEach((btn) => btn.classList.remove("active"));

          evtTarget.classList.add("active");
          this.currentSlideIdx = [...this.dots].indexOf(evtTarget);
        }
      }

      let sliderWidth = this.slides[this.currentSlideIdx].offsetWidth;

      if (this.currentSlideIdx === 0) {
        this.currentSlideIdx = 0;
        this.sliderBox.style.transform = `translate3d(0, 0, 0)`;
      } else {
        this.sliderBox.style.transform = `translate3d(${
          sliderWidth * (this.currentSlideIdx * -1)
        }px, 0, 0)`;
      }
    }

    toggleSlides() {
      if (this.isToggle) {
        [...this.slides].forEach((slide, idx) => {
          if (slide.classList.contains("slide-current")) {
            this.currentSlideIdx = idx;
            slide.classList.remove("slide-current");
          }
        });
        if (!this.slides[this.currentSlideIdx + 1]) {
          this.currentSlideIdx = 0;
          this.currentImg =
            this.slides[this.currentSlideIdx].querySelector("img");
          this.slides[this.currentSlideIdx].classList.add("slide-current");
        } else {
          this.currentImg =
            this.slides[this.currentSlideIdx + 1].querySelector("img");
          this.slides[this.currentSlideIdx + 1].classList.add("slide-current");
        }
        this.onHandleChangeCurrentImg(this.currentImg);
        this.isToggle = false;
      }
    }
  }

  VoLTe["Slider"] = Slider;

  return (window.VoLTe = VoLTe);
})();
