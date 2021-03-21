import React, { Suspense, useCallback, useEffect, useState } from "react";

import { openDataAnimation } from "./animation";
import { useResizeObserver } from "./hooks";
import { lazyWithPreload } from "../../helpers";

import "./landingPage.css";

const DataDisplay = lazyWithPreload(() => import("../DataDisplay/DataDisplay"));

export default function LandingPage() {
  const [open, setOpen] = useState(false);
  const [dataDisplayRef, setDataDisplayRef] = useState(null);
  const [displayWrapperRef, setDisplayWrapperRef] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadDataDisplay = useCallback(() => {
    setLoading(true);

    DataDisplay.preload().then(() => {
      setOpen(true);
      setLoading(false);
    });
  }, []);

  const handleResizeElement = useCallback(
    (clientRect) => {
      if (displayWrapperRef) {
        displayWrapperRef.style["max-height"] = `${clientRect.height}px`;
        // Setting transition now so it doesn't mess with the initial animation that already happened.
        displayWrapperRef.style.transition = "max-height ease-in-out 0.3s";
      }
    },
    [displayWrapperRef]
  );

  const connectResizeObserver = useResizeObserver(dataDisplayRef, handleResizeElement);

  useEffect(() => {
    // Trigger animation when DataDisplay appears in the page.

    if (dataDisplayRef) {
      let dataDisplayHeight = dataDisplayRef.getBoundingClientRect().height;
      openDataAnimation({
        height: dataDisplayHeight,
        timelineConf: { onComplete: connectResizeObserver }
      });
    }
  }, [connectResizeObserver, dataDisplayRef]);

  return (
    <div className="landingPage">
      <h1>CPU Monitoring App</h1>
      <div
        className="landingPage__displayWrapper"
        ref={(ref) => {
          setDisplayWrapperRef(ref);
        }}
      >
        {open && (
          // Using Suspense's fallback messes with animations so we do our own
          // loading state in the button.
          <Suspense fallback={null}>
            <DataDisplay
              ref={(ref) => {
                setDataDisplayRef(ref);
              }}
            />
          </Suspense>
        )}
      </div>
      <button
        className={`landingPage__button ${loading ? "loading" : ""}`.trim()}
        onClick={loadDataDisplay}
        disabled={loading}
      >
        <div className="translucent" />
        ENTER
      </button>
    </div>
  );
}
