/**
 * Tabs
 */

(function () {
  const VoLTe = window?.VoLTe || {};

  class Tabs {
    constructor() {
      this.tabsInstance = document.querySelectorAll(".tabs");
      this.tabsInstanceLi = null;
      this.tabsInstanceContainer = null;
      this.tabsInstanceContainerLi = null;

      this._setTabsElements = this._setTabsElements.bind(this);
      this._setTabsHandler = this._setTabsHandler.bind(this);
    }

    _setTabsElements() {
      [...this.tabsInstance].map((tab) => {
        this.tabsInstanceLi = [...tab.querySelectorAll("li")];
        this.tabsInstanceContainer = tab.nextElementSibling;
        this.tabsInstanceContainerLi = [
          ...this.tabsInstanceContainer.querySelectorAll("li"),
        ];
      });
    }

    _setTabsHandler() {
      [...this.tabsInstance].map((tab) => {
        tab.addEventListener("click", (evt) => {
          if (evt.target.tagName === "A") {
            evt.preventDefault();
            let parentLi = evt.target.closest("li");
            let tabIdx = this.tabsInstanceLi.indexOf(parentLi);

            this.tabsInstanceLi.forEach((li) =>
              li.classList.remove("active-tab")
            );
            parentLi.classList.add("active-tab");

            this.tabsInstanceContainerLi.forEach((li) =>
              li.classList.remove("active-tab")
            );
            this.tabsInstanceContainerLi[tabIdx].classList.add("active-tab");
          }
        });
      });
    }

    init() {
      this._setTabsElements();
      this._setTabsHandler();
    }
  }

  VoLTe["Tabs"] = Tabs;

  return (window.VoLTe = VoLTe);
})();
