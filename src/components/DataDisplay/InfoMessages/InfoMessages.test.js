import React from "react";
import { render } from "@testing-library/react";
import InfoMessages from "./InfoMessages";

test("Renders nothig as default value", () => {
  let { container } = render(<InfoMessages />);

  expect(container.childElementCount).toBe(0);
});

const THRESHOLD_DURATION = 1;

test("Renders warning message when high workload is reached", () => {
  let { rerender, getByText } = render(
    <InfoMessages threshold={1} thresholdDuration={THRESHOLD_DURATION} />
  );

  for (let i = 0; i < THRESHOLD_DURATION * 6; i++) {
    // Mock workload sample.
    let mockLoadSample = { load: 2, time: new Date() };
    rerender(
      <InfoMessages
        lastLoad={mockLoadSample}
        threshold={1}
        thresholdDuration={THRESHOLD_DURATION}
      />
    );
  }

  let warningMessage = getByText(
    `Heavy workload level since more than ${THRESHOLD_DURATION} minutes!`
  );

  expect(warningMessage).toBeInTheDocument();
});

test("Renders warning message only if samples above the threshold are consecutive", () => {
  let { container, rerender } = render(
    <InfoMessages threshold={1} thresholdDuration={THRESHOLD_DURATION} />
  );

  // We mock three samples above the average with one below the average in between.
  for (let i = 0; i < THRESHOLD_DURATION * 6 + 1; i++) {
    // The second sample will be below the threshold.
    let mockLoadSample = { load: i === 1 ? 0 : 2, time: new Date() };
    rerender(
      <InfoMessages
        lastLoad={mockLoadSample}
        threshold={1}
        thresholdDuration={THRESHOLD_DURATION}
      />
    );
  }

  expect(container.childElementCount).toBe(0);
});

test("Erases warning message when CPU recovers from high workload situation", () => {
  let { rerender, container } = render(
    <InfoMessages threshold={1} thresholdDuration={THRESHOLD_DURATION} />
  );

  for (let i = 0; i < THRESHOLD_DURATION * 6; i++) {
    // Mock workload sample.
    let mockLoadSample = { load: 2, time: new Date().setSeconds(i) };
    rerender(
      <InfoMessages
        lastLoad={mockLoadSample}
        threshold={1}
        thresholdDuration={THRESHOLD_DURATION}
      />
    );
  }

  for (let i = 0; i < THRESHOLD_DURATION * 6; i++) {
    // Mock workload sample.
    let mockLoadSample = { load: 0, time: new Date().setSeconds(i) };
    rerender(
      <InfoMessages
        lastLoad={mockLoadSample}
        threshold={1}
        thresholdDuration={THRESHOLD_DURATION}
      />
    );
  }

  // Since the component has children we will check that they are not the warning message.
  expect(container.firstElementChild.className).not.toBe(
    "infoMessages__warning"
  );
});

test("Logs changes of state", () => {
  let numOfSamples = THRESHOLD_DURATION * 6;
  let { rerender, getByText } = render(
    <InfoMessages threshold={1} thresholdDuration={THRESHOLD_DURATION} />
  );

  // We pass all samples needed to enter workload state and then all the samples neede to recover
  // from high workload state. We generate the samples so each one logs a time of 0:00:i.
  let i;
  for (i = 0; i < numOfSamples; i++) {
    let mockLoadSample = { load: 2, time: new Date(2020, 2, 18).setSeconds(i) };
    rerender(
      <InfoMessages
        lastLoad={mockLoadSample}
        threshold={1}
        thresholdDuration={THRESHOLD_DURATION}
      />
    );
  }

  let entryLog = getByText(
    `Entered in heavy workload at 0:00:${i - 1 < 10 ? "0" : ""}${i - 1}`
  );

  for (; i < 2 * numOfSamples; i++) {
    let mockLoadSample = { load: 0, time: new Date(2020, 2, 18).setSeconds(i) };
    rerender(
      <InfoMessages
        lastLoad={mockLoadSample}
        threshold={1}
        thresholdDuration={THRESHOLD_DURATION}
      />
    );
  }

  let recoveryLog = getByText(
    `Recovered from heavy workload at 0:00:${i - 1 < 10 ? "0" : ""}${i - 1}`
  );

  expect(entryLog).toBeInTheDocument();
  expect(recoveryLog).toBeInTheDocument();
});
