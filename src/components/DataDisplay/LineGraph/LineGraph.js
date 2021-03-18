import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";

// Configuration for CPU data line in Chart.
const dataset = {
  label: "CPU load",
  // purple color if RBG -> #6F42C1
  backgroundColor: "rgba(111,66,193,0.4)",
  // indigo color.
  borderColor: "#6610f2",
  borderCapStyle: "round",
  borderDashOffset: 0.0,
  borderJoinStyle: "miter",
  borderWidth: 2,
  // indigo color.
  pointBorderColor: "#6610f2",
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  // indigo color.
  pointHoverBackgroundColor: "#6610f2",
  pointHoverBorderColor: "rgba(220,220,220,1)",
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
  yAxisID: "y-axis"
};

// Y axis placed to the right of the Graph.
const options = {
  scales: {
    yAxes: [
      {
        id: "y-axis",
        position: "right",
        ticks: { beginAtZero: true }
      }
    ]
  }
};

export default function LineGraph({ data, labels }) {
  const dataProp = useMemo(() => {
    return {
      labels,
      datasets: [{ ...dataset, data }]
    };
  }, [data, labels]);

  return <Line data={dataProp} options={options} />;
}
