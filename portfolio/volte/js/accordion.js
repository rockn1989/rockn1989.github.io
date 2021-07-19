/**
 * Accordion
 */

(function () {
  const VoLTe = window?.VoLTe || {};

  class Accordion {
    constructor() {
      this.accordions = document.querySelectorAll(".accordion");

      this._setAccordionHandler = this._setAccordionHandler.bind(this);
    }

    _setAccordionHandler() {
      [...this.accordions].map((accordion) => {
        accordion.addEventListener("click", (evt) => {
          evt.preventDefault();
          const { target } = evt;
          if (
            target.tagName === "A" &&
            target.classList.contains("accordion__title")
          ) {
            let contentBlock = target.nextElementSibling;

            target.classList.toggle("active");
            contentBlock.classList.toggle("active");
          }
        });
      });
    }

    init() {
      this._setAccordionHandler();
    }
  }

  VoLTe["Accordion"] = Accordion;

  return (window.VoLTe = VoLTe);
})();
