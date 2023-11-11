import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import CountrySelect from "./CountrySelect"; // Import your CountrySelect component
// import useSWR from "swr";
const useSWR = require("swr");
jest.mock("axios");

jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(),
  mutate: jest.fn(),
}));

describe("<CountrySelect />", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const mockData = [
      { name: { common: "Country 1" } },
      { name: { common: "Country 2" } },
    ];
    useSWR.default.mockReturnValue({ data: mockData, error: undefined });
    // jest.spyOn(axios, "get").mockResolvedValue({ data: mockData });
  });

  it("should handle error state", async () => {
    // jest.spyOn(axios, "get").mockRejectedValue({ error: "failed" });
    useSWR.default.mockReturnValue({ data: undefined, error: "fail!" });

    render(<CountrySelect />);

    await waitFor(() => {
      expect(
        screen.getByText("Failed to load the countries...")
      ).toBeInTheDocument();
    });
  });

  it("should display country data correctly", async () => {
    render(<CountrySelect />);

    const input = screen.getByRole("combobox", { name: "Country" });

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "C" } });

    await waitFor(() => {
      expect(screen.getByText("Country 1")).toBeInTheDocument();
      expect(screen.getByText("Country 2")).toBeInTheDocument();
    });
  });

  it("should handle user interaction", async () => {
    const mockData = [
      { name: { common: "Country 1" } },
      { name: { common: "Country 2" } },
    ];
    jest.spyOn(axios, "get").mockResolvedValue({ data: mockData });

    render(<CountrySelect />);

    const input = screen.getByRole("combobox", { name: "Country" });

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "C" } });

    await waitFor(() => {
      fireEvent.change(input, { target: { value: "Country 1" } });
    });

    fireEvent.click(screen.getByText("Country 1"));

    expect(input).toHaveValue("Country 1");
  });
});
