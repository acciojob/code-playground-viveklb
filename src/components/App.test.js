import React from "react";
import { fireEvent, render } from "@testing-library/react";
import App from "./App";

test("protects the playground until the user logs in", () => {
  const { getByRole, getByText } = render(<App />);

  expect(getByRole("heading", { name: "Login" })).toBeTruthy();
  fireEvent.click(getByRole("button", { name: "Log in" }));
  expect(getByRole("heading", { name: "Code Playground" })).toBeTruthy();
  expect(getByText("Authentication status: Logged in")).toBeTruthy();

  fireEvent.click(getByRole("button", { name: "Log out" }));
  expect(getByRole("heading", { name: "Login" })).toBeTruthy();
});