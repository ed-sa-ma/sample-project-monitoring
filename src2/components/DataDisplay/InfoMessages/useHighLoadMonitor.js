import { useState, useRef, useMemo, useEffect } from "react";

// This custom hook will keep track of the status of the application depending on the stream of
// values it will receive in 'lastLoad' argument. When in high workload state it will search values
// below the threshold during thresholdDuration to register a recovery and same for values over the
// threshold when out of high workload state.
// The return values will be a boolen 'highLoad' and an array of 'changes'.
export default function useHighLoadMonitor(lastLoad, threshold, thresholdDuration) {
  const [highLoad, setHighLoad] = useState(false);
  const [changes, setChanges] = useState([]);

  const sequenceLength = useRef(0);

  const numSamplesThreshold = useMemo(() => {
    return thresholdDuration * 6;
  }, [thresholdDuration]);

  useEffect(() => {
    if (!lastLoad) return;

    let { load, time } = lastLoad;

    if (highLoad) {
      if (load >= threshold) {
        sequenceLength.current = 0;
      } else {
        sequenceLength.current += 1;
        if (sequenceLength.current === numSamplesThreshold) {
          setHighLoad(false);
          // 'change: 0' means recovery from high load situation.
          setChanges((changes) => [...changes, { change: 0, time, threshold }]);
        }
      }
    } else {
      if (load < threshold) {
        sequenceLength.current = 0;
      } else {
        sequenceLength.current += 1;
        if (sequenceLength.current === numSamplesThreshold) {
          setHighLoad(true);
          // 'change: 1' means entered in high load situation.
          setChanges((changes) => [...changes, { change: 1, time, threshold }]);
        }
      }
    }
  }, [lastLoad, highLoad, numSamplesThreshold, threshold]);

  return [highLoad, changes];
}
