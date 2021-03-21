import React from "react";

/**
 * @see {@link https://reactjs.org/docs/code-splitting.html#reactlazy}
 * @see {@link https://medium.com/hackernoon/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d#c30d}
 * @param {@function} factory - Callback returning the promise from a dynamic import
 * @returns {Object} Module with a default export containing a React component.
 */
function lazyWithPreload(factory) {
  const Component = React.lazy(factory);
  Component.preload = factory;
  return Component;
}

/**
 * This function will generate an array of labels where only whole minutes will be labeled:
 * ["+10min", "", "", "", "", "", "+9 min", "", ...]
 *
 * @param {number} numSamples
 * @returns {string[]}
 */
function generateLabels(numSamples) {
  let labels = new Array(numSamples).fill("");
  let numLabels = numSamples / 6;

  for (let i = 1; i <= numLabels; i++) {
    labels[i * 6 - 1] = `+${i} min`;
  }

  labels[0] = 0;

  return labels.reverse();
}

/**
 * Function to debouce a callback.
 * @see {@link https://redd.one/blog/debounce-vs-throttle#debounce}
 *
 * @param {@function} cb
 * @param {number} ms
 * @returns {@function}
 */
function debounce(cb, ms = 500) {
  if (!cb || typeof cb !== "function") {
    throw new TypeError("Provide a callback to be debounced.");
  }

  let timeout = null;

  function debounced(...args) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      cb(...args);
      timeout = null;
    }, ms);
  }

  return debounced;
}

export { debounce, generateLabels, lazyWithPreload };
