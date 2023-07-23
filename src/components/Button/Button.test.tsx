import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import Button from "./Button";

describe("Button", () => {
  const BUTTON_TEXT = "Test";
  it("should render a button element", () => {
    const mockFn = vi.fn();
    render(<Button onClick={mockFn}>{BUTTON_TEXT}</Button>);

    expect(screen.getByText(BUTTON_TEXT)).toBeInTheDocument();
  });

  it("should fire the passed in function when clicked", () => {
    const mockFn = vi.fn();

    render(<Button onClick={mockFn}>{BUTTON_TEXT}</Button>);

    fireEvent.click(screen.getByText(BUTTON_TEXT));

    expect(mockFn).toBeCalledTimes(1);
  });

  it("should be disabled when prop is true", () => {
    const mockFn = vi.fn();
    render(
      <Button onClick={mockFn} disabled>
        {BUTTON_TEXT}
      </Button>,
    );

    expect(screen.getByText(BUTTON_TEXT)).toHaveAttribute("disabled");
    expect(screen.getByText(BUTTON_TEXT)).toHaveClass("disabled");
  });

  it("should have class submit when type submit", () => {
    const mockFn = vi.fn();
    render(
      <Button onClick={mockFn} type="submit">
        {BUTTON_TEXT}
      </Button>,
    );

    expect(screen.getByText(BUTTON_TEXT)).toHaveClass("submit");
  });

  it("should not fire the passed function when disabled", () => {
    const mockFn = vi.fn();

    render(
      <Button onClick={mockFn} disabled>
        {BUTTON_TEXT}
      </Button>,
    );

    fireEvent.click(screen.getByText(BUTTON_TEXT));

    expect(mockFn).not.toBeCalled();
  });
});
