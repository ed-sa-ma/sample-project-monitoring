import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders header and Button", () => {
  const { getByText, getByRole } = render(<App />);
  const headline = getByText(/CPU Monitoring App/);
  const enterButton = getByRole("button");

  expect(headline).toBeInTheDocument();
  expect(enterButton).toBeInTheDocument();
});

test("Shows data when ENTER button is clicked", () => {
  const { getByText, getByRole } = render(<App />);

  fireEvent.click(getByText(/enter/i));

  let paragraph = getByText(
    /Find below the evolution of the average workload of your Central Procressing Unit. Heavy workload will be notified when the value overpasses 1 for > 2min\./
  );
  let valuesList = getByText(/last values:/i);

  expect(paragraph).toBeInTheDocument();
  expect(valuesList).toBeInTheDocument();
  expect(getByRole("button")).toBeInTheDocument();
});
