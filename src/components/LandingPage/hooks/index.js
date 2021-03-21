import { useCallback, useEffect, useState } from "react";

/**
 * @param {string|HTMLElement} selectorOrRef
 * @param {@function} cb
 * @returns @function connectResizeObserver
 */
function useResizeObserver(selectorOrRef, cb) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (selectorOrRef && enabled) {
      let observer = new ResizeObserver((entries) => {
        let { target: element } = entries[0];

        cb(element.getBoundingClientRect());
      });

      let elementRef =
        typeof selectorOrRef === "string" ? document.querySelector(selectorOrRef) : selectorOrRef;

      observer.observe(elementRef);

      return () => {
        observer.disconnect();
      };
    }
  }, [cb, enabled, selectorOrRef]);

  const connectResizeObserver = useCallback(() => {
    setEnabled(true);
  }, []);

  return connectResizeObserver;
}

export { useResizeObserver };
