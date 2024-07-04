
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import App from "./App";

describe("App", () => {
  test("should render App component whit list", () => {
    render(<App />);
    expect(screen.getByTestId('app')).toBeInTheDocument();
    expect(screen.getByTestId('list')).toBeInTheDocument();
  });
});
