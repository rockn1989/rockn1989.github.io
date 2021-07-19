/**
 * Libs
 */

(function () {
  const VoLTe = window?.VoLTe || {};

  class Libs {
    init() {
      if (typeof objectFitImages === "function") {
        objectFitImages();
      }

      svg4everybody();
    }
  }

  VoLTe["Libs"] = Libs;

  return (window.VoLTe = VoLTe);
})();
