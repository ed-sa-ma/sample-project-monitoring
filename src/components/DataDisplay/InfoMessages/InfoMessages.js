import React from "react";

import useHighLoadMonitor from "./useHighLoadMonitor";
import Change from "./Change/Change";

import "./infoMessages.css";

export default function InfoMessages({ lastLoad, threshold, thresholdDuration }) {
  const [highLoad, changes] = useHighLoadMonitor(lastLoad, threshold, thresholdDuration);

  return (
    <>
      {highLoad && (
        <h3 className="infoMessages__warning">{`Heavy workload level since more than ${thresholdDuration} ${
          thresholdDuration === 1 ? "minute" : "minutes"
        }!`}</h3>
      )}
      {changes.map((change) => (
        <Change key={change.time} item={change} />
      ))}
    </>
  );
}
