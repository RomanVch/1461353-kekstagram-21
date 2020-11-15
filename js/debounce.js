'use strict';
const DEBOUNCE_INTERVAL = 500;
let lastTimeOut = null;
window.debounce = (cb) => {
  return (...parameters) => {
    if (lastTimeOut) {
      window.clearTimeout(lastTimeOut);
    }

    lastTimeOut = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};
