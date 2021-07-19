(function () {
  /**
   * Components init
   */

  for (let Component in window.VoLTe) {
    new VoLTe[Component]().init();
  }

  if (!Element.prototype.closest) {
    const closestScript = document.createElement("script");
    closestScript.src = "js/polyfill.js";
    document.body.appendChild(closestScript);
  }
})();
