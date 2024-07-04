import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Checkbox from "./index";

describe("Checkbox", () => {
  test("should be checked when checked is true", () => {
    render(<Checkbox checked={true} />);
    const component = screen.getByTestId('checkbox');
    expect(component).toBeChecked();
  });

  test("should not be checked when checked is false", () => {
    render(<Checkbox checked={false} />);
    const component = screen.getByTestId('checkbox');
    expect(component).not.toBeChecked();
  });

  test("should be indeterminate when checked is null", () => {
    render(<Checkbox checked={null} />);
    const component = screen.getByTestId('checkbox');
    expect(component.indeterminate).toBe(true);
  });
});