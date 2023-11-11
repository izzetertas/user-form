import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import axios from "axios";

import RegisterForm from "./RegisterForm";
const useSWR = require("swr");
jest.mock("axios");

jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(),
  mutate: jest.fn(),
}));

describe("<RegisterForm />", () => {
  beforeAll(() => {
    jest.clearAllMocks();
    // jest.spyOn(axios, "get").mockResolvedValue({
    //   data: [
    //     { name: { common: "Country 1" } },
    //     { name: { common: "Country 2" } },
    //   ],
    // });

    const mockData = [
      { name: { common: "Country 1" } },
      { name: { common: "Country 2" } },
    ];
    useSWR.default.mockReturnValue({ data: mockData, error: undefined });
    jest.spyOn(axios, "post").mockResolvedValue({ data: "OK" });
  });

  it("should render the initial form", () => {
    render(<RegisterForm />);

    expect(
      screen.getByText("Some Useful Government Service")
    ).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Male")).toBeInTheDocument();
    expect(screen.getByLabelText("Female")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Apply" })).toBeInTheDocument();
  });

  it("should display an error message for invalid form submission", async () => {
    render(<RegisterForm />);

    act(() => {
      // Attempt to submit the form without entering any data
      fireEvent.click(screen.getByRole("button", { name: "Apply" }));
    });

    expect(screen.getByText(`"Name" must be a string`)).toBeInTheDocument();
  });

  it("should allow valid form submission", async () => {
    render(<RegisterForm />);

    // Fill in the form fields with valid data
    const nameInput = screen.getByTestId("name-test-id").querySelector("input");
    nameInput.focus();
    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    fireEvent.click(screen.getByLabelText("Male"));
    fireEvent.change(screen.getByTestId("age-test-id").querySelector("input"), {
      target: { value: "30" },
    });

    // Simulate selecting a country using the CountrySelect component
    const countrySelect = screen.getByRole("combobox", { name: "Country" });

    fireEvent.focus(countrySelect);
    fireEvent.change(countrySelect, { target: { value: "C" } });

    await waitFor(() => {
      fireEvent.change(countrySelect, { target: { value: "Country 1" } });
    });

    expect(countrySelect).toHaveValue("Country 1");
    fireEvent.click(screen.getByText("Country 1"));

    act(() => {
      // Attempt to submit the form
      fireEvent.click(screen.getByRole("button", { name: "Apply" }));
    });

    await waitFor(() => {
      // Verify that the success message is displayed
      expect(screen.getByText("Application Complete")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Thank you for applying to this useful government service"
        )
      ).toBeInTheDocument();
    });
  });

  it("should display an error message for server-side error", async () => {
    // Mock Axios to simulate a server-side error
    jest.spyOn(axios, "post").mockRejectedValue({
      response: { status: 400, data: { message: "Server error" } },
    });

    render(<RegisterForm />);

    // Fill in the form fields with valid data
    const nameInput = screen.getByTestId("name-test-id").querySelector("input");
    nameInput.focus();
    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    fireEvent.click(screen.getByLabelText("Male"));
    fireEvent.change(screen.getByTestId("age-test-id").querySelector("input"), {
      target: { value: "30" },
    });

    // Simulate selecting a country using the CountrySelect component
    const countrySelect = screen.getByRole("combobox", { name: "Country" });

    fireEvent.focus(countrySelect);
    fireEvent.change(countrySelect, { target: { value: "C" } });

    await waitFor(() => {
      fireEvent.change(countrySelect, { target: { value: "Country 1" } });
    });

    expect(countrySelect).toHaveValue("Country 1");

    fireEvent.click(screen.getByText("Country 1"));

    act(() => {
      // Attempt to submit the form
      fireEvent.click(screen.getByRole("button", { name: "Apply" }));
    });
    await waitFor(() => {
      // Verify that the error message is displayed
      expect(screen.getByText("Server error")).toBeInTheDocument();
    });
  });
});
