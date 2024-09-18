import App from "../App";
import { render, screen } from "@testing-library/react";
import { Todo } from "../domain/todo";

const mockGetAllTodos = jest.fn().mockResolvedValue([new Todo("1", "test1", 1), new Todo("2", "test2", 2), new Todo("3", "test3", 3), new Todo("4", "test4", 4)]);

describe("App", () => {
  it("タイトルがあること", () => {
    render(<App />);
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
    screen.debug();
  });

  it("ローディング中のタイトルがあること", () => {
    render(<App />);
    const title = screen.getByTestId("loading-title");
    expect(title).toBeInTheDocument();
    screen.debug();
  });

  it("新規作成のボタンがあること", () => {
    render(<App />);
    const button = screen.getByTestId("create-button");
    expect(button).toBeInTheDocument();
    screen.debug();
  });
});
