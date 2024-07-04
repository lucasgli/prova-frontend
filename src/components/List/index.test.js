import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import List from "./index";

const items = {
    1: {
      id: 1,
      name: 'Father 1',
      checked: false,
      level: 0,
      children: {
        2: {
          id: 2,
          name: 'Children 1.1',
          checked: false,
          level: 1,
          children: {}
        }
      }
    },
    3: {
      id: 3,
      name: 'Children 2',
      checked: false,
      level: 0,
      children: {}
    }
  };
  
  describe("List", () => {
    test("should render list items and their children's", () => {
      render(<List items={items} updateItem={jest.fn()} />);
      expect(screen.getByTestId('list')).toBeInTheDocument();
      expect(screen.getByTestId('list-item-1')).toBeInTheDocument();
      expect(screen.getByTestId('list-item-3')).toBeInTheDocument();
    });
  
    test("should expand item and show children's", () => {
      window.HTMLElement.prototype.scrollIntoView = jest.fn()
      render(<List items={items} updateItem={jest.fn()} />);
      fireEvent.click(screen.getByTestId('arrow-1'));
      expect(screen.getByTestId('list-item-2')).toBeInTheDocument();
    });

    test("should update checkbox state on click", () => {
        const updateItem = jest.fn();
        render(<List items={items} updateItem={updateItem} />);
        const leftDiv = screen.getByTestId('list-item-action-1')
        fireEvent.click(leftDiv);
        expect(updateItem).toHaveBeenCalled();
      });
    
    test("should smooth scroll to item on expand", () => {
      const scrollIntoViewMock = jest.fn();
      window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
      
      render(<List items={items} updateItem={jest.fn()} />);
      fireEvent.click(screen.getByTestId('arrow-1'));
      expect(scrollIntoViewMock).toHaveBeenCalled();
    });
  });