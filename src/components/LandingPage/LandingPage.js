import React, { Suspense, useCallback, useEffect, useState } from "react";

import { openDataAnimation } from "./animation";
import useResizeMonitor from "./hooks/useResizeMonitor";

import "./landingPage.css";

function lazyWithPreload(factory) {
  const Component = React.lazy(factory);
  Component.preload = factory;
  return Component;
}

const DataDisplay = lazyWithPreload(() => import("../DataDisplay/DataDisplay"));

export default function LandingPage() {
  const [open, setOpen] = useState(false);
  const [dataDisplayRef, setDataDisplayRef] = useState(null);
  const [dataWrapperRef, setDataWrapperRef] = useState(null);
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
      if (dataWrapperRef) {
        dataWrapperRef.style["max-height"] = `${clientRect.height}px`;
        dataWrapperRef.style.transition = "max-height ease-in-out 0.3s";
      }
    },
    [dataWrapperRef]
  );

  const connectResizeMonitor = useResizeMonitor(dataDisplayRef, handleResizeElement);

  useEffect(() => {
    if (dataDisplayRef) {
      let dataDisplayHeight = dataDisplayRef.getBoundingClientRect().height;
      openDataAnimation({
        height: dataDisplayHeight,
        timelineConf: { onComplete: connectResizeMonitor }
      });
    }
  }, [connectResizeMonitor, dataDisplayRef]);

  return (
    <div className="landingPage">
      <h1>CPU Monitoring App</h1>
      <div
        className="landingPage__dataWrapper"
        ref={(ref) => {
          setDataWrapperRef(ref);
        }}
      >
        {open && (
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
