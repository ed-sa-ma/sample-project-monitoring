import React, { useState, useMemo } from "react";

import { debounce } from "../../../helpers";

import "./RangeControl.css";

export default function RangeControl({
  label,
  max = 100,
  min = 0,
  name,
  onChange,
  value: propsValue,
  step = 1
}) {
  const [stateValue, setStateValue] = useState(propsValue);
  const debouncedOnChange = useMemo(() => debounce(onChange, 300), [onChange]);

  function handleChange(event) {
    setStateValue(event.target.valueAsNumber);
    debouncedOnChange(event.target.valueAsNumber);
  }

  const inputElement = (
    <input
      max={max}
      min={min}
      step={step}
      name={name || "range"}
      type="range"
      onChange={handleChange}
      value={stateValue}
    />
  );

  return (
    <>
      {label ? (
        <label className="rangeControl__label" htmlFor={name || "range"}>
          {label}
          {inputElement}
          <span>{stateValue.toFixed(1)}</span>
        </label>
      ) : (
        inputElement
      )}
    </>
  );
}
