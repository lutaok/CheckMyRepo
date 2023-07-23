import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TextInput from "./TextInput";

describe("TextInput", () => {
  const INPUT_PLACEHOLDER = "TEST PLACEHOLDER";
  const INPUT_NAME = "TEST";
  it("should render an input element of type text", () => {
    const mockFn = vi.fn();
    render(<TextInput name={INPUT_NAME} placeholder={INPUT_PLACEHOLDER} onValueChange={mockFn} value="" />);

    expect(screen.getByPlaceholderText(INPUT_PLACEHOLDER)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(INPUT_PLACEHOLDER)).toHaveAttribute("type", "text");
  });

  it("should display a value when passed", () => {
    const mockFn = vi.fn();
    const VALUE_PROP = "valueProp";
    render(<TextInput name={INPUT_NAME} placeholder={INPUT_PLACEHOLDER} onValueChange={mockFn} value={VALUE_PROP} />);

    expect(screen.getByDisplayValue(VALUE_PROP)).toBeInTheDocument();
  });
});
