import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import ArrowIcon from "../../../src/components/ArrowIcon";


describe("ArrowIcon", () => {
  test("should be visible", () => {
    render(<ArrowIcon isOpen={true} isAnimating={true} />);
    const component = screen.getByTestId('arrow-icon');
    expect(component).toBeVisible();
  });

  test("should have blue color when isOpen is true", () => {
    render(<ArrowIcon isOpen={true} isAnimating={false} />);
    const component = screen.getByTestId('arrow-icon');
    expect(component).toHaveStyle('color: blue');
  });

  test("should rotate 180 degrees when isOpen is true", () => {
    render(<ArrowIcon isOpen={true} isAnimating={false} />);
    const component = screen.getByTestId('arrow-icon');
    expect(component).toHaveStyle('transform: rotate(180deg)');
  });

  test("should have rotate-up class when isAnimating and isOpen are true", () => {
    render(<ArrowIcon isOpen={true} isAnimating={true} />);
    const component = screen.getByTestId('arrow-icon');
    expect(component).toHaveClass('rotate-up');
  });

  test("should have rotate-down class when isAnimating is true and isOpen is false", () => {
    render(<ArrowIcon isOpen={false} isAnimating={true} />);
    const component = screen.getByTestId('arrow-icon');
    expect(component).toHaveClass('rotate-down');
  });

  test("should not have any rotate class when isAnimating is false", () => {
    render(<ArrowIcon isOpen={true} isAnimating={false} />);
    const component = screen.getByTestId('arrow-icon');
    expect(component).not.toHaveClass('rotate-up');
    expect(component).not.toHaveClass('rotate-down');
  });
});
