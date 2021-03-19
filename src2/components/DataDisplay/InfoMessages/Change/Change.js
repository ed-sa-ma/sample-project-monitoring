import React, { useMemo } from "react";

import "./change.css";

export default function Change({ item }) {
  const date = useMemo(() => {
    return new Date(item.time);
  }, [item.time]);

  return (
    <p className="change">{`${item.change ? "Entered in" : "Recovered from"} heavy workload ( > ${
      item.threshold
    }) at ${date.toLocaleTimeString()}`}</p>
  );
}
