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

export { debounce, generateLabels };
