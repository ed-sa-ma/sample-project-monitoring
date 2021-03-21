import React, { useCallback, useMemo, useState } from "react";

import LineChart from "./LineGraph/LineGraph";
import InfoMessages from "./InfoMessages/InfoMessages";
import RangeControl from "./RangeControl/RangeControl";
import { generateLabels } from "./helpers";
import useFetchWorkload from "./hooks/useFetchWorkload";

import "./dataDisplay.css";

// ** USE THIS VALUES TO CONFIGURE THE MONITORING ** //
const TIME_FRAME = 10; // minutes
const INITIAL_THRESHOLD_VALUE = 1;
const THRESHOLD_DURATION = 1; //minutes

export default React.forwardRef(function DataDisplay(_, ref) {
  // Number of samples from time frame (6 samples/minute).
  const numSamples = useMemo(() => {
    return TIME_FRAME * 6;
  }, []);

  // Fetch from backend.
  const dataArray = useFetchWorkload(numSamples);

  // Generate data for chart.
  const graphLabels = useMemo(() => generateLabels(numSamples), [numSamples]);
  const graphData = useMemo(() => {
    // Array padded with 0s when data is not available yet to fill the chart.
    let data = [
      ...new Array(numSamples - dataArray.length).fill(0),
      ...dataArray.map((item) => item.load)
    ];

    return data;
  }, [dataArray, numSamples]);

  const [threshold, setThreshold] = useState(INITIAL_THRESHOLD_VALUE);

  const handleThresholdChange = useCallback((newValue) => {
    setThreshold(newValue);
  }, []);

  return (
    <div className="dataDisplay" ref={ref}>
      <p>
        {`Find below the evolution of the average workload of the instance running our lambda function. Heavy workload state will be activated when the value overpasses
        ${threshold}
        for > ${THRESHOLD_DURATION}min. Threshold value can be chaged to be able to enter this state.`}
      </p>
      <RangeControl
        label={"Threshold: "}
        max={4}
        min={0}
        step={0.1}
        onChange={handleThresholdChange}
        value={threshold}
      />
      <LineChart data={graphData} labels={graphLabels} />
      <h3>{`Last Values: ${graphData[graphData.length - 1]}, ${graphData[graphData.length - 2]}, ${
        graphData[graphData.length - 3]
      }, ...`}</h3>
      <InfoMessages
        lastLoad={dataArray[dataArray.length - 1]}
        threshold={threshold}
        thresholdDuration={THRESHOLD_DURATION}
      />
    </div>
  );
});
