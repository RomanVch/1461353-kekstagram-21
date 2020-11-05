'use strict';
(() => {
  const DEBOUNCE_INTERVAL = 500;

  window.debounce = (cb) => {
    let lastTimeOut = null;

    return (...parameters) => {
      if (lastTimeOut) {
        window.clearTimeout(lastTimeOut);
      }
      lastTimeOut = window.setTimeout(() => {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
