import React, { useCallback, useEffect, useRef, useState } from "react";

import DataDisplay from "../DataDisplay/DataDisplay";
import openDataAnimation from "./animation/openData";
import useResizeMonitor from "./hooks/useResizeMonitor";

import "./landingPage.css";

export default function LandingPage() {
  const [open, setOpen] = useState(false);
  const [dataDisplayRef, setDataDisplayRef] = useState(null);
  const [dataWrapperRef, setDataWrapperRef] = useState(null);
  const dataRef = useRef(null);

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

  function openData() {
    setOpen((o) => !o);
  }

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
          <div
            className="landingPage__dataPlaceholder"
            ref={(ref) => {
              setDataDisplayRef(ref);
            }}
          >
            <div ref={dataRef}>
              <DataDisplay />
            </div>
          </div>
        )}
      </div>
      <button className="landingPage__button" onClick={openData}>
        ENTER
      </button>
    </div>
  );
}
