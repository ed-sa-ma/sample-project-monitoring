import { useEffect, useState } from "react";

/**
 * @typedef {Object} Workload
 * @property {number} load
 * @property {Date} time
 */

/**
 * @param {number} numSamples
 * @returns {Workload[]} dataArray
 */
export default function useFetchWorkload(numSamples) {
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    async function fetchLoad() {
      try {
        let response = await fetch("/api/workload");
        let load = await response.json();

        // Keep a maximum of numSamples items.
        setDataArray((currentArray) => {
          let newArray = [...currentArray, load];
          if (newArray.length > numSamples) newArray.shift();

          return newArray;
        });
      } catch (e) {
        console.error(`Error while fetching data: ${e}`);
      }
    }

    // Run initial fetch.
    fetchLoad();

    // Execute one fetch every 10 seconds.
    let intervalRef = setInterval(() => {
      fetchLoad();
    }, 10000);

    return () => {
      clearInterval(intervalRef);
    };
  }, [numSamples]);

  return dataArray;
}
